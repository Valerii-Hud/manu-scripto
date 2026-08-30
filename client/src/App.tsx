import useFetch from './hooks/useFetch';
import './scss/app.scss';
function App() {
  const { data: user, isLoading: isLoadingUser } = useFetch({
    queryKey: 'user',
    showError: false,
  });

  return <div className="app">Test</div>;
}
export default App;
