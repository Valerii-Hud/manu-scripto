import { Link } from 'react-router-dom';
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton';
import { useQuery, type UseMutateFunction } from '@tanstack/react-query';
import { api } from '../../api/api';
import type { IUser } from '../../types/interfaces';
import useFollow from '../../hooks/useFollow';

interface ViewProps {
  isFetching: boolean;
  isFollowing: boolean;
  suggestedUsers: IUser[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  follow: UseMutateFunction<any, Error, string, unknown>;
}

const RightPanel = () => {
  const { follow, isFollowing } = useFollow();
  const { data: suggestedUsers, isFetching } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      return await api({
        showError: false,
        endpoint: '/api/v1/users/suggested',
      });
    },
  });

  if (suggestedUsers?.length === 0) {
    return <div className="md:w-64 w-8"></div>;
  }

  return (
    <View
      isFetching={isFetching}
      isFollowing={isFollowing}
      suggestedUsers={suggestedUsers}
      follow={follow}
    />
  );
};

const View = ({
  isFetching,
  isFollowing,
  suggestedUsers,
  follow,
}: ViewProps) => (
  <div className="hidden lg:block my-4 mx-2">
    <div className=" p-4  sticky top-2 bg-primary  rounded-md">
      <p className="font-bold text-primary-content">Who to follow</p>
      <div className="flex flex-col gap-4">
        {(isFetching || isFollowing) && (
          <>
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
          </>
        )}
        {!(isFetching || isFollowing) &&
          suggestedUsers?.map((user: IUser) => (
            <Link
              to={`/${user.userName}`}
              className="flex items-center justify-between gap-4"
              key={user._id}
            >
              <div className="flex gap-2 items-center">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={user.profileImage || '/avatar-placeholder.png'} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-primary-content tracking-tight truncate w-28">
                    {user.fullName}
                  </span>
                  <span className="text-sm text-primary-content">
                    @{user.userName}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="btn bg-primary-content text-primary hover:bg-white hover:opacity-90 rounded-full btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    follow(user._id);
                  }}
                >
                  {isFollowing ? 'Following...' : 'Follow'}
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  </div>
);

export default RightPanel;
