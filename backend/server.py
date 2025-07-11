from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional, List
import os
import logging
import uuid
import aiofiles
import shutil
from pathlib import Path
from pydantic import BaseModel, Field
from jose import JWTError, jwt
from dotenv import load_dotenv
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client.get_database(os.environ.get('DB_NAME', 'redimacol'))

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'tu-clave-secreta-muy-segura-para-redimacol')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

# Create the main app
app = FastAPI(title="REDIMACOL - Fe y Practica API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Create uploads directory
uploads_dir = ROOT_DIR / "uploads"
uploads_dir.mkdir(exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# Models
class UserBase(BaseModel):
    username: str
    email: str
    full_name: str
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    created_at: datetime
    avatar_url: Optional[str] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class PostBase(BaseModel):
    content: str
    location: Optional[str] = None
    is_important: bool = False
    is_pinned: bool = False

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: str
    author_id: str
    author_name: str
    author_avatar: Optional[str] = None
    created_at: datetime
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    audio_url: Optional[str] = None
    likes: int = 0
    comments: int = 0
    shares: int = 0
    liked_by: List[str] = []

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    post_id: str

class Comment(CommentBase):
    id: str
    post_id: str
    author_id: str
    author_name: str
    author_avatar: Optional[str] = None
    created_at: datetime

class NewsBase(BaseModel):
    title: str
    content: str
    category: str = "general"
    is_important: bool = False

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: str
    author_id: str
    author_name: str
    created_at: datetime
    image_url: Optional[str] = None

class EventBase(BaseModel):
    title: str
    description: str
    event_date: datetime
    location: str

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: str
    created_by: str
    created_at: datetime
    attendees: List[str] = []

class PrayerRequestBase(BaseModel):
    title: str
    description: str
    category: str = "general"

class PrayerRequestCreate(PrayerRequestBase):
    pass

class PrayerRequest(PrayerRequestBase):
    id: str
    requester_id: str
    requester_name: str
    created_at: datetime
    prayers_count: int = 0
    prayed_by: List[str] = []

# Security functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(username: str):
    user = await db.users.find_one({"username": username})
    if user:
        return UserInDB(**user)

async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user

# File upload function
async def save_file(file: UploadFile, folder: str) -> str:
    """Save uploaded file and return URL"""
    file_extension = file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = uploads_dir / folder / unique_filename
    
    # Create folder if it doesn't exist
    (uploads_dir / folder).mkdir(exist_ok=True)
    
    async with aiofiles.open(file_path, 'wb') as f:
        content = await file.read()
        await f.write(content)
    
    return f"/uploads/{folder}/{unique_filename}"

# Authentication Routes
@api_router.post("/auth/register", response_model=User)
async def register_user(user: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    existing_email = await db.users.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict.pop('password')
    user_dict.update({
        "id": str(uuid.uuid4()),
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow(),
        "avatar_url": None
    })
    
    result = await db.users.insert_one(user_dict)
    user_dict.pop('hashed_password')
    return User(**user_dict)

@api_router.post("/auth/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# Posts Routes
@api_router.post("/posts", response_model=Post)
async def create_post(
    content: str = Form(...),
    location: Optional[str] = Form(None),
    is_important: bool = Form(False),
    is_pinned: bool = Form(False),
    image: Optional[UploadFile] = File(None),
    video: Optional[UploadFile] = File(None),
    audio: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_active_user)
):
    post_dict = {
        "id": str(uuid.uuid4()),
        "content": content,
        "location": location,
        "is_important": is_important,
        "is_pinned": is_pinned,
        "author_id": current_user.id,
        "author_name": current_user.full_name,
        "author_avatar": current_user.avatar_url,
        "created_at": datetime.utcnow(),
        "likes": 0,
        "comments": 0,
        "shares": 0,
        "liked_by": []
    }
    
    # Handle file uploads
    if image:
        post_dict["image_url"] = await save_file(image, "images")
    if video:
        post_dict["video_url"] = await save_file(video, "videos")
    if audio:
        post_dict["audio_url"] = await save_file(audio, "audio")
    
    result = await db.posts.insert_one(post_dict)
    return Post(**post_dict)

@api_router.get("/posts", response_model=List[Post])
async def get_posts(limit: int = 20, skip: int = 0):
    posts = await db.posts.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [Post(**post) for post in posts]

@api_router.post("/posts/{post_id}/like")
async def like_post(post_id: str, current_user: User = Depends(get_current_active_user)):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if current_user.id in post.get("liked_by", []):
        # Unlike
        await db.posts.update_one(
            {"id": post_id},
            {
                "$pull": {"liked_by": current_user.id},
                "$inc": {"likes": -1}
            }
        )
        return {"message": "Post unliked", "liked": False}
    else:
        # Like
        await db.posts.update_one(
            {"id": post_id},
            {
                "$push": {"liked_by": current_user.id},
                "$inc": {"likes": 1}
            }
        )
        return {"message": "Post liked", "liked": True}

# Comments Routes
@api_router.post("/comments", response_model=Comment)
async def create_comment(
    comment: CommentCreate,
    current_user: User = Depends(get_current_active_user)
):
    comment_dict = {
        "id": str(uuid.uuid4()),
        "content": comment.content,
        "post_id": comment.post_id,
        "author_id": current_user.id,
        "author_name": current_user.full_name,
        "author_avatar": current_user.avatar_url,
        "created_at": datetime.utcnow()
    }
    
    # Insert comment
    result = await db.comments.insert_one(comment_dict)
    
    # Update post comment count
    await db.posts.update_one(
        {"id": comment.post_id},
        {"$inc": {"comments": 1}}
    )
    
    return Comment(**comment_dict)

@api_router.get("/posts/{post_id}/comments", response_model=List[Comment])
async def get_comments(post_id: str):
    comments = await db.comments.find({"post_id": post_id}).sort("created_at", 1).to_list(100)
    return [Comment(**comment) for comment in comments]

# News Routes
@api_router.post("/news", response_model=News)
async def create_news(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form("general"),
    is_important: bool = Form(False),
    image: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_active_user)
):
    news_dict = {
        "id": str(uuid.uuid4()),
        "title": title,
        "content": content,
        "category": category,
        "is_important": is_important,
        "author_id": current_user.id,
        "author_name": current_user.full_name,
        "created_at": datetime.utcnow()
    }
    
    if image:
        news_dict["image_url"] = await save_file(image, "news")
    
    result = await db.news.insert_one(news_dict)
    return News(**news_dict)

@api_router.get("/news", response_model=List[News])
async def get_news(limit: int = 20, skip: int = 0):
    news = await db.news.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [News(**item) for item in news]

# Events Routes
@api_router.post("/events", response_model=Event)
async def create_event(
    event: EventCreate,
    current_user: User = Depends(get_current_active_user)
):
    event_dict = {
        "id": str(uuid.uuid4()),
        "title": event.title,
        "description": event.description,
        "event_date": event.event_date,
        "location": event.location,
        "created_by": current_user.id,
        "created_at": datetime.utcnow(),
        "attendees": []
    }
    
    result = await db.events.insert_one(event_dict)
    return Event(**event_dict)

@api_router.get("/events", response_model=List[Event])
async def get_events():
    events = await db.events.find().sort("event_date", 1).to_list(100)
    return [Event(**event) for event in events]

# Prayer Requests Routes
@api_router.post("/prayer-requests", response_model=PrayerRequest)
async def create_prayer_request(
    prayer_request: PrayerRequestCreate,
    current_user: User = Depends(get_current_active_user)
):
    prayer_dict = {
        "id": str(uuid.uuid4()),
        "title": prayer_request.title,
        "description": prayer_request.description,
        "category": prayer_request.category,
        "requester_id": current_user.id,
        "requester_name": current_user.full_name,
        "created_at": datetime.utcnow(),
        "prayers_count": 0,
        "prayed_by": []
    }
    
    result = await db.prayer_requests.insert_one(prayer_dict)
    return PrayerRequest(**prayer_dict)

@api_router.get("/prayer-requests", response_model=List[PrayerRequest])
async def get_prayer_requests():
    prayers = await db.prayer_requests.find().sort("created_at", -1).to_list(100)
    return [PrayerRequest(**prayer) for prayer in prayers]

@api_router.post("/prayer-requests/{prayer_id}/pray")
async def pray_for_request(prayer_id: str, current_user: User = Depends(get_current_active_user)):
    prayer = await db.prayer_requests.find_one({"id": prayer_id})
    if not prayer:
        raise HTTPException(status_code=404, detail="Prayer request not found")
    
    if current_user.id not in prayer.get("prayed_by", []):
        await db.prayer_requests.update_one(
            {"id": prayer_id},
            {
                "$push": {"prayed_by": current_user.id},
                "$inc": {"prayers_count": 1}
            }
        )
    
    return {"message": "Prayer added", "prayers_count": prayer.get("prayers_count", 0) + 1}

# Basic endpoints
@api_router.get("/")
async def root():
    return {"message": "REDIMACOL - Fe y Practica API", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)