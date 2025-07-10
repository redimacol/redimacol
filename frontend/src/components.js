import React, { useState, useRef } from 'react';

// Header Component
export const Header = ({ darkMode, setDarkMode, setShowPostModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, message: 'Juan Carlos te envió una solicitud de amistad', time: '5m', avatar: 'https://images.unsplash.com/photo-1647833190352-0e7e579b45b6' },
    { id: 2, message: 'Nueva publicación en Iglesia Central', time: '1h', avatar: 'https://images.unsplash.com/photo-1581589329842-a5c69e03540b' },
    { id: 3, message: 'María comentó tu publicación', time: '2h', avatar: 'https://images.unsplash.com/photo-1647833202056-e6e67293ba81' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo and Search */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">✝</span>
            </div>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden md:block">
              REDIMACOL "FE y PRACTICA"
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en REDIMACOL"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 8H16c-.83 0-1.5.67-1.5 1.5v.5h-2v-.5C12.5 8.67 11.83 8 11 8H8.5c-.83 0-1.5.67-1.5 1.5v.5h-2v-.5C5 8.67 4.33 8 3.5 8H1c-.83 0-1.5.67-1.5 1.5v.5h2v11h2V10h2v12h2V10h2v12h2V10h2v12h2z"/>
            </svg>
          </button>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowPostModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Crear
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notificaciones</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <img src={notification.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1647833190352-0e7e579b45b6" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1647833190352-0e7e579b45b6" 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">María González</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ver perfil</p>
                    </div>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700 mb-3" />
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      {darkMode ? 'Modo claro' : 'Modo oscuro'}
                    </span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ darkMode }) => {
  const menuItems = [
    { icon: '👤', label: 'María González', isProfile: true },
    { icon: '👥', label: 'Amigos' },
    { icon: '⏰', label: 'Recuerdos' },
    { icon: '💾', label: 'Guardado' },
    { icon: '👥', label: 'Grupos' },
    { icon: '📺', label: 'Video' },
    { icon: '🛒', label: 'Marketplace' },
    { icon: '📰', label: 'Noticias de Perú' },
    { icon: '⛪', label: 'Iglesias Cercanas' },
    { icon: '🙏', label: 'Cadena de Oración' },
    { icon: '📖', label: 'Estudios Bíblicos' },
    { icon: '🎵', label: 'Música Cristiana' },
  ];

  return (
    <div className="fixed left-0 top-16 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left ${
                item.isProfile ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Versículo del día</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito..." 
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Juan 3:16</p>
        </div>
      </div>
    </div>
  );
};

// Main Feed Component
export const MainFeed = ({ darkMode, setShowPostModal, setShowStoryModal }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Pastor Juan Carlos',
      avatar: 'https://images.unsplash.com/photo-1647833190352-0e7e579b45b6',
      time: '2h',
      content: '¡Qué hermoso servicio tuvimos hoy! El Señor se manifestó poderosamente. 🙏✨',
      image: 'https://images.unsplash.com/photo-1655392030908-5086e079c0d8',
      likes: 24,
      comments: 8,
      shares: 3,
      location: 'Iglesia Central Lima'
    },
    {
      id: 2,
      author: 'María Santos',
      avatar: 'https://images.unsplash.com/photo-1647833202056-e6e67293ba81',
      time: '4h',
      content: 'Estudiando la Palabra con mis hijos. Nunca es demasiado temprano para enseñar sobre el amor de Dios. 📖👨‍👩‍👧‍👦',
      image: 'https://images.unsplash.com/photo-1636228492584-fb485ee36af9',
      likes: 45,
      comments: 12,
      shares: 7
    },
    {
      id: 3,
      author: 'Iglesia Esperanza',
      avatar: 'https://images.unsplash.com/photo-1581589329842-a5c69e03540b',
      time: '6h',
      content: 'IMPORTANTE: Campaña de ayuda para los hermanos afectados por las lluvias en el norte del Perú. Necesitamos tu colaboración. 🇵🇪❤️',
      image: 'https://images.unsplash.com/photo-1650386511247-7888bd152c51',
      likes: 89,
      comments: 23,
      shares: 34,
      isImportant: true
    },
    {
      id: 4,
      author: 'Ana Flores',
      avatar: 'https://images.unsplash.com/photo-1717278087583-2afc764c9f2a',
      time: '8h',
      content: 'Compartiendo esta hermosa alabanza que ministró mi corazón hoy. ¡Gloria a Dios! 🎵🙌',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      likes: 67,
      comments: 15,
      shares: 12
    }
  ]);

  const stories = [
    { id: 1, author: 'Tu historia', avatar: 'https://images.unsplash.com/photo-1647833190352-0e7e579b45b6', isOwn: true },
    { id: 2, author: 'Pastor Luis', avatar: 'https://images.unsplash.com/photo-1647833202056-e6e67293ba81', image: 'https://images.unsplash.com/photo-1699974627415-1f3c5387af51' },
    { id: 3, author: 'Jóvenes FyP', avatar: 'https://images.unsplash.com/photo-1717278087583-2afc764c9f2a', image: 'https://images.unsplash.com/photo-1617282537910-35fce9dbda9c' },
    { id: 4, author: 'Coro Central', avatar: 'https://images.unsplash.com/photo-1655392030908-5086e079c0d8', image: 'https://images.pexels.com/photos/15689010/pexels-photo-15689010.jpeg' },
    { id: 5, author: 'Ministerio Niños', avatar: 'https://images.unsplash.com/photo-1650386511247-7888bd152c51', image: 'https://images.pexels.com/photos/12004695/pexels-photo-12004695.jpeg' }
  ];

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto p-4 ml-64 mr-80">
      {/* Stories Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => !story.isOwn && setShowStoryModal(true)}
            >
              <div className="relative">
                <div className={`w-24 h-32 rounded-lg overflow-hidden ${
                  story.isOwn ? 'bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600' : ''
                }`}>
                  {story.isOwn ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 text-center px-1">Crear historia</span>
                    </div>
                  ) : (
                    <img
                      src={story.image}
                      alt={story.author}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400 max-w-24 truncate">
                {story.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex space-x-3">
          <img
            src="https://images.unsplash.com/photo-1647833190352-0e7e579b45b6"
            alt="Tu perfil"
            className="w-10 h-10 rounded-full object-cover"
          />
          <button
            onClick={() => setShowPostModal(true)}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full px-4 py-2 text-left text-gray-500 dark:text-gray-400"
          >
            ¿Qué está pasando en tu vida espiritual?
          </button>
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span className="text-sm">Video en vivo</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span className="text-sm">Foto/Video</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span className="text-sm">Sentimiento</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${post.isImportant ? 'border-l-4 border-red-500' : ''}`}>
            {post.isImportant && (
              <div className="bg-red-50 dark:bg-red-900 px-4 py-2 rounded-t-lg">
                <span className="text-red-600 dark:text-red-400 text-sm font-medium">📢 Noticia Importante del Perú</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{post.author}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.time}</span>
                    {post.location && (
                      <>
                        <span>•</span>
                        <span>{post.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
              
              {post.image && (
                <div className="mb-3">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg object-cover max-h-96"
                  />
                </div>
              )}
              
              {post.videoUrl && (
                <div className="mb-3">
                  <div className="relative pb-56 h-0 rounded-lg overflow-hidden">
                    <iframe
                      src={post.videoUrl}
                      title="Video"
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">👍</span>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{post.comments} comentarios</span>
                  <span>{post.shares} compartidas</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg flex-1 justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Me gusta</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg flex-1 justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Comentar</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg flex-1 justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Right Sidebar Component
export const RightSidebar = ({ darkMode }) => {
  const contacts = [
    { id: 1, name: 'Ana Rodríguez', avatar: 'https://images.unsplash.com/photo-1647833202056-e6e67293ba81', online: true },
    { id: 2, name: 'Carlos Mendoza', avatar: 'https://images.unsplash.com/photo-1647833190352-0e7e579b45b6', online: true },
    { id: 3, name: 'Lucía Torres', avatar: 'https://images.unsplash.com/photo-1717278087583-2afc764c9f2a', online: false },
    { id: 4, name: 'Pedro Sánchez', avatar: 'https://images.unsplash.com/photo-1650386511247-7888bd152c51', online: true },
    { id: 5, name: 'Isabel Vargas', avatar: 'https://images.unsplash.com/photo-1655392030908-5086e079c0d8', online: false },
  ];

  const events = [
    { id: 1, title: 'Servicio Dominical', time: 'Hoy 10:00 AM', location: 'Iglesia Central' },
    { id: 2, title: 'Estudio Bíblico', time: 'Mañana 7:00 PM', location: 'Salón de Conferencias' },
    { id: 3, title: 'Conferencia Juventud', time: 'Sábado 3:00 PM', location: 'Auditorio Principal' },
  ];

  return (
    <div className="fixed right-0 top-16 w-80 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        {/* Events Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Próximos Eventos</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200">{event.title}</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">{event.time}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{event.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Contactos</h3>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prayer Requests */}
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Peticiones de Oración</h3>
          <div className="space-y-2">
            <div className="text-sm text-yellow-700 dark:text-yellow-300">
              <p className="font-medium">María S.</p>
              <p>Oración por sanidad de su madre</p>
            </div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">
              <p className="font-medium">Juan C.</p>
              <p>Bendición en nuevo trabajo</p>
            </div>
            <button className="text-xs text-yellow-600 dark:text-yellow-400 hover:underline">
              Ver todas las peticiones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Post Modal Component
export const PostModal = ({ darkMode, onClose }) => {
  const [postText, setPostText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [postType, setPostType] = useState('text');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPostType(file.type.startsWith('image/') ? 'image' : 'video');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the post to your backend
    console.log('Nueva publicación:', { postText, selectedFile, postType });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full m-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Crear publicación</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1647833190352-0e7e579b45b6"
              alt="Tu perfil"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">María González</h3>
              <select className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                <option>Público</option>
                <option>Amigos</option>
                <option>Solo yo</option>
              </select>
            </div>
          </div>

          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="¿Qué está pasando en tu vida espiritual?"
            className="w-full p-3 border-none resize-none text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none"
            rows="4"
          />

          {selectedFile && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Archivo seleccionado: {selectedFile.name}</p>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-sm text-red-500 hover:text-red-700 mt-1"
              >
                Eliminar archivo
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Añadir a tu publicación</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
          />

          <button
            type="submit"
            disabled={!postText.trim() && !selectedFile}
            className={`w-full mt-4 py-2 px-4 rounded-lg font-medium ${
              postText.trim() || selectedFile
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

// Story Modal Component
export const StoryModal = ({ darkMode, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg p-6 text-white min-h-96">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1647833202056-e6e67293ba81"
              alt="Pastor Luis"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">Pastor Luis</h3>
              <p className="text-sm opacity-80">Hace 2 horas</p>
            </div>
          </div>
          
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1699974627415-1f3c5387af51"
              alt="Historia"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg font-medium">
              "Levantad vuestros ojos a los cielos, y mirad abajo a la tierra"
            </p>
            <p className="text-sm mt-2 opacity-80">Isaías 40:26</p>
          </div>
        </div>
      </div>
    </div>
  );
};