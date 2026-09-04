import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import LoginPage from './pages/auth/login/LoginPage';
import useFetch from './hooks/fetch/useFetch';
function App() {
  const { data: user, isLoading: isLoadingUser } = useFetch({
    queryKey: 'user',
    showError: false,
  });

  if (isLoadingUser) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/signup" element={user ? <HomePage /> : <SignupPage />} />
      <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
      <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
      <Route
        path="/:userName"
        element={user ? <ProfilePage /> : <LoginPage />}
      />
    </Routes>
  );
}
export default App;
