import './_post.scss';
import { CiCircleList } from 'react-icons/ci';

interface ProfileImageFallbackProps {
  userName: string;
}

const PostHeader = () => {
  const user = {
    profileImage: '',
    userName: 'Auri',
  };

  return (
    <div className="post-header ">
      <ProfileImageFallback userName={user.userName} />
      <div className="post-header__user-container">
        <div className="post-header__user-username">Username</div>
        <div className="post-header__user-type">Sponsored</div>
      </div>
      {/* fix adaptation */}
      <button className="post-header__subscribe">Subscribe</button>{' '}
      <CiCircleList className="post-header__user-menu" />
    </div>
  );
};

const ProfileImageFallback = ({ userName }: ProfileImageFallbackProps) => {
  return (
    <div className="post-header__user-profile-image_fallback">
      {userName[0] + userName[1]}
    </div>
  );
};

export default PostHeader;
