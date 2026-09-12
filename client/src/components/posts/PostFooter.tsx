import {
  CiHeart,
  CiBookmark,
  CiRepeat,
  CiLocationArrow1,
} from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa';

const PostFooter = () => {
  return (
    <div className="post-footer ">
      <div className="post-footer_numbers-container">
        <CiHeart />
        <div className="post-footer_numbers">60,2 k</div>
        <FaRegComment />
        <div className="post-footer_numbers">385</div>
        <CiRepeat />
        <div className="post-footer_numbers">673</div>
        <CiLocationArrow1 />
        <div className="post-footer_numbers">2 685</div>
        <CiBookmark />
      </div>
      <div className="post-footer_about-container">
        <div className="post-footer_user-container">
          <div className="post-footer_about-username">iamtrilliontt</div>
          <div className="post-footer_about-title">see you 3 ccccc</div>
        </div>
        <div className="post-footer_date-container">
          <div className="post-footer_about-date">6 days ago</div>
          {/* <div className="post-footer_about-title">iamtrilliontt</div> */}
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
