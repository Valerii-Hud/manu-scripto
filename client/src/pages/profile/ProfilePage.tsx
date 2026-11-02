import '../../scss/pages/profile/_profile-page.scss';
import { LuAlignJustify } from 'react-icons/lu';
import {
  LuLayoutGrid,
  LuSquarePlay,
  LuContact,
  LuCirclePlus,
} from 'react-icons/lu';
import catAvatar from './../../assets/dummy/cat_avatar.jpg';
import MobileNavMenu from '../../common/ui/mobile/MobileNavMenu';
const ProfilePage = () => {
  return (
    <div className="profile">
      <div className="profile__topbar">
        <div className="profile__topbar__add">
          <LuCirclePlus />
        </div>
        <div className="profile__topbar__username">no_name_aka_no_name</div>
        <div className="profile__topbar__settings">
          <LuAlignJustify />
        </div>
      </div>
      <div className="profile__wrapper">
        <img className="profile__image" src={catAvatar}></img>
        <div className="profile__info">
          <div className="profile__name">noname </div>
          <div className="profile__stats">
            <div className="profile__stats__item">
              <span>0</span>
              <div>posts</div>
            </div>
            <div className="profile__stats__item">
              <span>10,2k</span>
              <div>subscribers</div>
            </div>
            <div className="profile__stats__item">
              <span>0</span>
              <div>following</div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__btns">
        <div className="profile__btn">Edit profile</div>
        <div className="profile__btn">Share profile</div>
      </div>
      <div className="profile__content">
        <div className="profile__tabs">
          <div className="profile__tab">
            <LuLayoutGrid />
          </div>
          <div className="profile__tab">
            <LuSquarePlay />
          </div>
          <div className="profile__tab">
            <LuContact />
          </div>
        </div>
      </div>
      <MobileNavMenu />
    </div>
  );
};

export default ProfilePage;
