import XSvg from '../svgs/N';

import { MdHomeFilled } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import useAuth, { type UseAuthProps } from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import type { INotification, IUser } from '../../types/interfaces';
import type { UseMutateFunction } from '@tanstack/react-query';

interface ViewProps {
  notifications: INotification[];
  authUser: IUser;
  // eslint-disable-next-line
  logout: UseMutateFunction<any, Error, UseAuthProps, unknown>;
}

const Sidebar = () => {
  const { auth: logout, authUser } = useAuth();
  const { notifications } = useNotification();
  return (
    <View notifications={notifications} authUser={authUser} logout={logout} />
  );
};

const View = ({ notifications, authUser, logout }: ViewProps) => (
  <div className="md:flex-[2_2_0] w-18 max-w-52">
    <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
      <Link to="/" className="flex justify-center md:justify-start">
        <XSvg className="px-2 w-12 h-12  fill-primary hover:bg-stone-900 " />
      </Link>
      <ul className="flex flex-col gap-3 mt-4">
        <li className="flex justify-center md:justify-start">
          <Link
            to="/"
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <MdHomeFilled className="w-8 h-8" />
            <span className="text-lg hidden md:block">Home</span>
          </Link>
        </li>
        <li className="flex justify-center md:justify-start">
          <Link
            to="/notifications"
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <IoNotifications className="w-6 h-6" />
            <span className="text-lg hidden md:block">Notifications</span>

            {notifications?.length >= 1 && (
              <span className="indicator-item badge badge-secondary">
                {notifications?.length > 99
                  ? '99+'
                  : notifications?.length <= 99
                    ? notifications?.length
                    : null}
              </span>
            )}
          </Link>
        </li>

        <li className="flex justify-center md:justify-start">
          <Link
            to={`/${authUser?.userName}`}
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <FaUser className="w-6 h-6" />
            <span className="text-lg hidden md:block">Profile</span>
          </Link>
        </li>
      </ul>
      {authUser && (
        <Link
          to={`/${authUser.userName}`}
          className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
        >
          <div className="avatar hidden md:inline-flex">
            <div className="w-8 rounded-full">
              <img src={authUser?.profileImage || '/avatar-placeholder.png'} />
            </div>
          </div>
          <div className="flex justify-between flex-1">
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm w-20 truncate">
                {authUser?.fullName}
              </p>
              <p className="text-slate-500 text-sm">@{authUser?.userName}</p>
            </div>
            <BiLogOut
              className="w-5 h-5 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                logout({ endpoint: 'logout' });
              }}
            />
          </div>
        </Link>
      )}
    </div>
  </div>
);

export default Sidebar;
