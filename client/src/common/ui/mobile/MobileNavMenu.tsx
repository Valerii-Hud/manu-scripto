import './_mobile-nav-menu.scss';
import {
  LuHouse,
  LuSquarePlay,
  LuSend,
  LuSearch,
  LuCircleUser,
} from 'react-icons/lu';

const MobileNavMenu = () => {
  return (
    <>
      <div className="mobile-nav-divider"></div>
      <nav className="mobile-nav">
        <div>
          <LuHouse />
        </div>
        <div>
          <LuSquarePlay />
        </div>
        <div>
          <LuSend />
        </div>
        <div>
          <LuSearch />
        </div>
        <div>
          <LuCircleUser />
        </div>
      </nav>
    </>
  );
};

export default MobileNavMenu;
