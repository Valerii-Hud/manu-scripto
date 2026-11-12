import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Post = () => {
  return (
    <div className="post">
      <PostHeader />
      <PostContent />
      <PostFooter />
    </div>
  );
};

export default Post;
