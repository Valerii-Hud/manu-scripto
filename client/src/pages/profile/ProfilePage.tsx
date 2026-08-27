import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import { Link, useParams } from 'react-router-dom';

import Posts, { type FeedType } from '../../components/common/Posts';
import ProfileHeaderSkeleton from '../../components/skeletons/ProfileHeaderSkeleton';
import EditProfileModal from './EditProfileModal';

import { FaArrowLeft } from 'react-icons/fa6';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import {
  QueryClient,
  useQuery,
  useQueryClient,
  type UseMutateFunction,
} from '@tanstack/react-query';
import { api, type ApiData } from '../../api/api';
import type { IPost, IUser } from '../../types/interfaces';
import { formatMemberSinceData } from '../../utils/data';
import useFollow from '../../hooks/useFollow';
import useUpdateProfile from '../../hooks/useUpdateProfile';

interface ViewProps {
  isRefetching: boolean;
  user: IUser;
  isFetchingUser: boolean;
  feedType: FeedType;
  coverImage: string;
  isMyProfile: boolean;
  coverImgRef: RefObject<HTMLInputElement | null>;
  handleImgChange: (e: ChangeEvent<HTMLInputElement>, state: string) => void;
  profileImgRef: RefObject<HTMLInputElement | null>;
  profileImage: string;
  setCoverImage: Dispatch<SetStateAction<string>>;
  setProfileImage: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line
  follow: UseMutateFunction<any, Error, string, unknown>;
  queryClient: QueryClient;
  isFollowing: boolean;
  memberSinceDate: string;
  authUser: IUser | undefined;
  // eslint-disable-next-line
  updateUserProfile: UseMutateFunction<any, Error, ApiData, unknown>;
  isUpdatingUserProfile: boolean;
  setFeedType: Dispatch<SetStateAction<FeedType>>;
  userName: string | undefined;
  posts: IPost[];
}

const ProfilePage = () => {
  const [coverImage, setCoverImage] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [feedType, setFeedType] = useState<FeedType>('posts');

  const coverImgRef = useRef<HTMLInputElement>(null);
  const profileImgRef = useRef<HTMLInputElement>(null);

  const { follow, isFollowing } = useFollow();

  const { userName } = useParams();
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData<IUser>(['authUser']);
  const isMyProfile = userName === authUser?.userName;
  const {
    data: user,
    isPending: isFetchingUser,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await api({ endpoint: `/api/v1/users/profile/${userName}` });
    },
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['posts', feedType, userName],
    queryFn: async () => {
      return await api({
        endpoint:
          feedType !== 'likes' && feedType !== 'posts'
            ? `/api/v1/posts/${feedType}`
            : feedType === 'likes'
              ? `/api/v1/posts/likes/${userName}`
              : `/api/v1/posts/user/${userName}`,
        showError: false,
      });
    },
  });
  const { isUpdatingUserProfile, updateUserProfile } = useUpdateProfile();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['posts', feedType, userName],
    });
  }, [feedType, queryClient, userName]);

  useEffect(() => {
    refetch();
  }, [userName, refetch]);

  const memberSinceDate = formatMemberSinceData(user?.createdAt);
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>, state: string) => {
    if (!e.target.files) return { error: 'Target Not Found' };
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          switch (state) {
            case 'coverImage':
              setCoverImage(reader.result);
              break;
            case 'profileImage':
              setProfileImage(reader.result);
              break;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <View
      setCoverImage={setCoverImage}
      setProfileImage={setProfileImage}
      isRefetching={isRefetching}
      user={user}
      isFetchingUser={isFetchingUser}
      feedType={feedType}
      coverImage={coverImage}
      isMyProfile={isMyProfile}
      handleImgChange={handleImgChange}
      profileImgRef={profileImgRef}
      profileImage={profileImage}
      follow={follow}
      queryClient={queryClient}
      isFollowing={isFollowing}
      memberSinceDate={memberSinceDate}
      authUser={authUser}
      updateUserProfile={updateUserProfile}
      isUpdatingUserProfile={isUpdatingUserProfile}
      setFeedType={setFeedType}
      userName={userName}
      posts={posts}
      coverImgRef={coverImgRef}
    />
  );
};

const View = ({
  isRefetching,
  user,
  setCoverImage,
  setProfileImage,
  isFetchingUser,
  feedType,
  coverImage,
  isMyProfile,
  coverImgRef,
  handleImgChange,
  profileImgRef,
  profileImage,
  follow,
  queryClient,
  isFollowing,
  memberSinceDate,
  authUser,
  updateUserProfile,
  isUpdatingUserProfile,
  setFeedType,
  userName,
  posts,
}: ViewProps) => (
  <>
    <div className="flex-[4_4_0]   border-r border-gray-700 min-h-screen ">
      {(isFetchingUser || isRefetching) && <ProfileHeaderSkeleton />}
      {!(isFetchingUser || isRefetching) && !user && (
        <p className="text-center text-lg mt-4">User not found</p>
      )}
      <div className="flex flex-col">
        {!(isFetchingUser || isRefetching) && user && (
          <>
            <div className="flex gap-10 px-4 py-2 items-center">
              <Link to="/">
                <FaArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex flex-col">
                <p className="font-bold text-lg">{user?.fullName}</p>
                <span className="text-sm text-slate-500">
                  {feedType === 'posts' && posts?.length}
                  {feedType === 'likes' && user?.likedPosts?.length} posts
                </span>
              </div>
            </div>
            <div className="relative group/cover">
              <img
                src={coverImage || user?.coverImage || '/cover.png'}
                className="h-52 w-full object-cover"
                alt="cover image"
              />
              {isMyProfile && (
                <div
                  className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                  onClick={() => {
                    if (coverImgRef) coverImgRef.current?.click();
                  }}
                >
                  <MdEdit className="w-5 h-5 text-white" />
                </div>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                ref={coverImgRef}
                onChange={(e) => handleImgChange(e, 'coverImage')}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                ref={profileImgRef}
                onChange={(e) => handleImgChange(e, 'profileImage')}
              />
              <div className="avatar absolute -bottom-16 left-4 ">
                <div className="w-32 rounded-full relative group/avatar">
                  <img
                    src={
                      profileImage ||
                      user?.profileImage ||
                      '/avatar-placeholder.png'
                    }
                  />
                  <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                    {isMyProfile && (
                      <MdEdit
                        className="w-4 h-4 text-white"
                        onClick={() => profileImgRef.current?.click()}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 mt-5">
              {isMyProfile && <EditProfileModal />}
              {!isMyProfile && (
                <button
                  className="btn btn-outline rounded-full btn-sm"
                  onClick={() => {
                    follow(user?._id);
                    queryClient.invalidateQueries({
                      queryKey: ['user'],
                    });
                  }}
                >
                  {isFollowing
                    ? 'Loading...'
                    : authUser?.following?.includes(user?._id)
                      ? 'Unfollow'
                      : 'Follow'}
                </button>
              )}
              {(coverImage || profileImage) && (
                <button
                  className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
                  onClick={async () => {
                    await updateUserProfile({ coverImage, profileImage });
                    setProfileImage('');
                    setCoverImage('');
                  }}
                >
                  {isUpdatingUserProfile ? 'Updating...' : 'Update'}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-14 px-4">
              <div className="flex flex-col">
                <span className="font-bold text-lg">{user?.fullName}</span>
                <span className="text-sm text-slate-500">
                  @{user?.userName}
                </span>
                <span className="text-sm my-1">{user?.bio}</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {user?.link && (
                  <div className="flex gap-1 items-center ">
                    <>
                      <FaLink className="w-3 h-3 text-slate-500" />
                      <a
                        href={`${user?.link}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {`${user?.link}`}
                      </a>
                    </>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-500">
                    {memberSinceDate}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <span className="font-bold text-xs">
                    {user?.following?.length}
                  </span>
                  <span className="text-slate-500 text-xs">Following</span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="font-bold text-xs">
                    {user?.followers?.length}
                  </span>
                  <span className="text-slate-500 text-xs">Followers</span>
                </div>
              </div>
            </div>
            <div className="flex w-full border-b border-gray-700 mt-4">
              <div
                className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
                onClick={() => setFeedType('posts')}
              >
                Posts
                {feedType === 'posts' && (
                  <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
                )}
              </div>
              <div
                className="flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer"
                onClick={() => setFeedType('likes')}
              >
                Likes
                {feedType === 'likes' && (
                  <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
                )}
              </div>
            </div>
          </>
        )}
        <Posts userName={userName} feedType={feedType} />
      </div>
    </div>
  </>
);

export default ProfilePage;
