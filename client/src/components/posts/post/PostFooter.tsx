import '../post/_post.scss';
import { LuHeart, LuMessageCircle, LuRepeat, LuBookmark } from 'react-icons/lu';

const PostFooter = () => {
  return (
    <div className="post__footer">
      <div className="post__footer__stats">
        <div className="post__footer__stats__group">
          <div className="post__footer__stats__item">
            <div className="post__footer__icon">
              <LuHeart />
            </div>
            <div>80</div>
          </div>
          <div className="post__footer__stats__item">
            <div className="post__footer__icon">
              <LuMessageCircle />
            </div>
            <div>2</div>
          </div>
          <div className="post__footer__stats__item">
            <div className="post__footer__icon">
              <LuRepeat />
            </div>
            <div>9</div>
          </div>
        </div>
        <div className="post__footer__stats__item">
          <div className="post__footer__icon">
            <LuBookmark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
