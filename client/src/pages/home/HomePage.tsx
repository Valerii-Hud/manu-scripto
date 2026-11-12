import { Posts } from '../../components/posts/Posts';
import './_home-page.scss';

const HomePage = () => {
  return (
    <div className="home">
      <aside>menu</aside>
      <div className="container">
        <Posts />
      </div>
      <div className="home_accs">accounts</div>
    </div>
  );
};

export default HomePage;
