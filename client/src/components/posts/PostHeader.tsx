import './_post.scss';
import { LuMenu } from 'react-icons/lu';

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
      <div className="post-header_left">
        <ProfileImageFallback userName={user.userName} />
        <div className="post-header__user-container">
          <div className="post-header__user-username">Username</div>
          <div className="post-header__user-type">Sponsored</div>
        </div>
      </div>
      <div className="post-header_right">
        <button className="post-header__subscribe">Subscribe</button>
        <LuMenu className="post-header__user-menu" />
      </div>

      {/* fix adaptation */}
    </div>
  );
};

export const ProfileImageFallback = ({
  userName,
}: ProfileImageFallbackProps) => {
  return (
    <div className="post-header__user-profile-image_fallback">
      {userName[0] + userName[1]}
    </div>
  );
};

export default PostHeader;
