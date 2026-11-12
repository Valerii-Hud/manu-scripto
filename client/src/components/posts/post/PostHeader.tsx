import '../post/_post.scss';
const PostHeader = () => {
  return (
    <div className="post__header">
      <div>
        <img
          src="https://i0.wp.com/boingboing.net/wp-content/uploads/2019/04/354.jpg?fit=536%2C354&ssl=1"
          className="post__header__image"
        />
      </div>
      <div>
        <div className="post__header__info">
          <div className="post__header__username">obiektive_eye</div>
          <div className="post__header__date">1 week ago</div>
        </div>
        <div>add info</div>
      </div>
      <div></div>
    </div>
  );
};

export default PostHeader;
