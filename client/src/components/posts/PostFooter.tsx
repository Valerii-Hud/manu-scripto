import {
  LuHeart,
  LuMessageSquare,
  LuRepeat2,
  LuSend,
  LuBookmark,
} from 'react-icons/lu';

const PostFooter = () => {
  return (
    <div className="post-footer ">
      <div className="post-footer_numbers-container">
        <div className="post-footer_likes post-footer_number_container">
          <LuHeart />
          <div className="post-footer_numbers ">60,2 k</div>
        </div>
        <div className="post-footer_comments post-footer_number_container">
          {' '}
          <LuMessageSquare />
          <div className="post-footer_numbers ">385</div>
        </div>
        <div className="post-footer_reposts post-footer_number_container">
          <LuRepeat2 />
          <div className="post-footer_numbers ">673</div>
        </div>
        <div className="post-footer_links post-footer_number_container">
          <LuSend />
          <div className="post-footer_numbers ">2 685</div>
        </div>
        <div className="post-footer_bookmarks post-footer_number_container">
          <LuBookmark />
        </div>
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
