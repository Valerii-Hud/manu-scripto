import './_mobile-nav-menu.scss';
import {
  CiHome,
  CiSearch,
  CiPlay1,
  CiPaperplane,
  CiUser,
} from 'react-icons/ci';

const MobileNavMenu = () => {
  return (
    <>
      <div className="mobile-nav-divider"></div>
      <nav className="mobile-nav">
        <div>
          <CiHome />
        </div>
        <div>
          <CiPlay1 />
        </div>
        <div>
          <CiPaperplane />
        </div>
        <div>
          <CiSearch />
        </div>
        <div>
          <CiUser />
        </div>
      </nav>
    </>
  );
};

export default MobileNavMenu;
