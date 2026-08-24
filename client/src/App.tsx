import { Navigate, Route, Routes } from 'react-router-dom';
// import SignUpPage from './pages/auth/signup/SignUpPage';
// import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
// import Sidebar from './components/common/Sidebar';
// import RightPanel from './components/common/RightPanel';
// import NotificationPage from './pages/notification/NotificationPage';
// import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';

import LoadingSpinner from './components/common/LoadingSpinner';
import useGetData from './hooks/useGetData';

function App() {
  const { data: authUser, isLoading } = useGetData({
    queryKey: 'authUser',
    showError: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {/* {authUser && <Sidebar />} */}
      <Routes>
        {/* <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        /> */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/:userName"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        /> */}
      </Routes>
      {/* {authUser && <RightPanel />} */}
      <Toaster position="bottom-center" />
    </div>
  );
}
export default App;
