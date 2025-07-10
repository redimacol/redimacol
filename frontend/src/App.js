import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Sidebar, MainFeed, RightSidebar, PostModal, StoryModal } from './components';

function App() {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Header 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            setShowPostModal={setShowPostModal}
          />
          <div className="flex pt-16">
            <Sidebar darkMode={darkMode} />
            <Routes>
              <Route path="/" element={
                <MainFeed 
                  darkMode={darkMode}
                  setShowPostModal={setShowPostModal}
                  setShowStoryModal={setShowStoryModal}
                />
              } />
            </Routes>
            <RightSidebar darkMode={darkMode} />
          </div>
          
          {showPostModal && (
            <PostModal 
              darkMode={darkMode}
              onClose={() => setShowPostModal(false)}
            />
          )}
          
          {showStoryModal && (
            <StoryModal 
              darkMode={darkMode}
              onClose={() => setShowStoryModal(false)}
            />
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;