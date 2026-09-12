import './_post.scss';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostContent from './PostContent';

const Post = () => {
  return (
    <article>
      <PostHeader />
      <PostContent />
      <PostFooter />
    </article>
  );
};

export default Post;
