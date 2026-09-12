import './_post.scss';
import catImg from '../../assets/dummy/cat.webp';

const PostContent = () => {
  return (
    <div className="post__content ">
      <img src={catImg} alt="cat" className="post__content_image" />
    </div>
  );
};

export default PostContent;
