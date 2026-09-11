import MobileNavMenu from '../../common/ui/mobile/MobileNavMenu';
import Post from '../../components/posts/Post';

const HomePage = () => {
  return (
    <main className="home">
      <Post />
      <MobileNavMenu />
    </main>
  );
};

export default HomePage;
