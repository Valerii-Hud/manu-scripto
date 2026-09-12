import MobileNavMenu from '../../common/ui/mobile/MobileNavMenu';
import Post from '../../components/posts/Post';

const HomePage = () => {
  return (
    <main className="home">
      {/* fix adaptation */}

      <Post />
      <Post />
      <Post />
      <Post />
      <Post />

      {/* fix adaptation */}
      <MobileNavMenu />
    </main>
  );
};

export default HomePage;
