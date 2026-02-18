
import React, { useState } from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Disciplines from './screens/Disciplines';
import Shop from './screens/Shop';
import Ranking from './screens/Ranking';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './screens/admin/AdminDashboard';
import StudentManager from './screens/admin/StudentManager';
import ValidationPortal from './screens/admin/ValidationPortal';
import { Screen, AdminScreen, UserStats } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [adminScreen, setAdminScreen] = useState<AdminScreen>(AdminScreen.OVERVIEW);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Mock User Stats
  const [userStats, setUserStats] = useState<UserStats>({
    name: 'Ana Luiza',
    level: 10,
    xp: 2486,
    maxXp: 5000,
    coins: 10996,
    avatar: '👩'
  });

  const handleLogin = (adminMode: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(adminMode);
    if (adminMode) {
      setAdminScreen(AdminScreen.OVERVIEW);
    } else {
      setCurrentScreen(Screen.DASHBOARD);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Reset to initial student dashboard for next student login
    setCurrentScreen(Screen.DASHBOARD);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Admin View
  if (isAdmin) {
    const renderAdminScreen = () => {
      switch (adminScreen) {
        case AdminScreen.OVERVIEW: return <AdminDashboard />;
        case AdminScreen.STUDENTS: return <StudentManager />;
        case AdminScreen.VALIDATION: return <ValidationPortal />;
        default: return <AdminDashboard />;
      }
    };

    return (
      <AdminLayout 
        activeScreen={adminScreen} 
        onNavigate={setAdminScreen}
        onLogout={handleLogout}
      >
        {renderAdminScreen()}
      </AdminLayout>
    );
  }

  // Student View
  const renderStudentScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return <Dashboard stats={userStats} onNavigate={setCurrentScreen} />;
      case Screen.DISCIPLINES:
        return <Disciplines onSelect={(id) => console.log('Selected discipline:', id)} />;
      case Screen.SHOP:
        return <Shop coins={userStats.coins} />;
      case Screen.RANKING:
        return <Ranking />;
      default:
        return <Dashboard stats={userStats} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <Layout 
      activeScreen={currentScreen} 
      stats={userStats} 
      onNavigate={setCurrentScreen}
      onLogout={handleLogout}
    >
      {renderStudentScreen()}
    </Layout>
  );
};

export default App;
