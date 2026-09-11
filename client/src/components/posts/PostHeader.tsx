import './_post.scss';
import { CiCircleList, CiUser } from 'react-icons/ci';

const PostHeader = () => {
  return (
    <div className="post-header">
      <CiUser className="post-header__user-profile-image" />
      <div className="post-header__user-container">
        <div className="post-header__user-username">Username</div>
        <div className="post-header__user-type">Sponsored</div>
      </div>
      <button className="post-header__subscribe">Subscribe</button>
      <CiCircleList className="post-header__user-menu" />
    </div>
  );
};

export default PostHeader;
