import './scss/_post.scss';
import PostHeader from './blocks/PostHeader';
import PostFooter from './blocks/PostFooter';
import PostContent from './blocks/PostContent';

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
