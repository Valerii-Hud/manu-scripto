import '../post/_post.scss';
import { LuBadgeCheck } from 'react-icons/lu';

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
          <div className="post__header__username">
            <div>obiektive_eye</div>
            <LuBadgeCheck />
          </div>
          <div className="post__header__dot" />
          <div className="post__header__date">1 week ago</div>
        </div>
        <div className="post__header__data">London</div>
      </div>
      <div></div>
    </div>
  );
};

export default PostHeader;
