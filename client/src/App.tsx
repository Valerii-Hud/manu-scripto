import { Route, Routes } from 'react-router-dom';
import './_app.scss';
import SignupPage from './pages/signup/SignupPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';

function App() {
  // const { data: user, isLoading: isLoadingUser } = useFetch({
  //   queryKey: 'user',
  //   showError: false,
  // });

  // if (isLoadingUser) {
  //   return <AppLoadingSpinner />;
  // }

  return (
    <Routes>
      {/* <Route path="/" element={<SignupPage />} /> */}
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<ProfilePage />} /> */}
      {/* <Route path="/" element={<VideosPage />} /> */}

      {/* <Route path="/signup" element={user ? <HomePage /> : <SignupPage />} />
      <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
      <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
      <Route
        path="/:userName"
        element={user ? <ProfilePage /> : <LoginPage />}
      /> */}
    </Routes>
  );
}
export default App;
