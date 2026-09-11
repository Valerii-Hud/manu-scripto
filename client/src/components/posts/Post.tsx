import './_post.scss';
import PostHeader from './PostHeader';
import catImg from '../../assets/dummy/cat.webp';

const Post = () => {
  return (
    <article>
      <PostHeader />
      <div className="post__content">
        <img src={catImg} alt="cat" className="post__content_image" />
      </div>
    </article>
  );
};

export default Post;
