import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import MobileNav from './components/common/MobileNav';
import AuthModal from './components/common/AuthModal';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import TransparencyPage from './pages/TransparencyPage';

function App() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('chatbot_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleVerify = (userData) => {
    localStorage.setItem('chatbot_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('chatbot_user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-screen bg-white font-sans text-slate-800 overflow-hidden">
      {!user && <AuthModal onVerify={handleVerify} />}

      <MobileNav onMenuClick={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={handleLogout}
        onChatSelect={(id) => {
          navigate(`/chat/${id}`);
          setIsSidebarOpen(false);
        }}
        onNewChat={() => {
          navigate('/');
          setIsSidebarOpen(false);
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Routes>
          <Route path="/" element={<ChatPage user={user} />} />
          <Route path="/chat/:id" element={<ChatPage user={user} />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminPage user={user} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;