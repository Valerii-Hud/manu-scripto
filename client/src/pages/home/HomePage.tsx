import MobileNavMenu from '../../common/ui/mobile/MobileNavMenu';
import MobileTopBar from '../../common/ui/mobile/MobileTopBar';
import Post from '../../components/posts/Post';

const HomePage = () => {
  return (
    <main className="home">
      <MobileTopBar />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />

      <MobileNavMenu />
    </main>
  );
};

export default HomePage;
