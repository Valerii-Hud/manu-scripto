import './_mobile-topbar.scss';
import { LuCirclePlus, LuChevronDown, LuHeart } from 'react-icons/lu';

const MobileTopBar = () => {
  return (
    <div className="mobile-topbar">
      <div>
        <LuCirclePlus />
      </div>
      <div className="mobile-topbar_feed">
        For you <LuChevronDown />
      </div>
      <div>
        <LuHeart />
      </div>
    </div>
  );
};

export default MobileTopBar;
