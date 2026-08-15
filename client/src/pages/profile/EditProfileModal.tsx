import { useEffect, useState, type ChangeEvent } from 'react';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import { useQueryClient, type UseMutateFunction } from '@tanstack/react-query';
import type { IUser } from '../../types/interfaces';
import type { ApiData } from '../../api/api';

interface FormData {
  fullName: string;
  userName: string;
  email: string;
  bio: string;
  link: string;
  newPassword: string;
  currentPassword: string;
}

interface ViewProps {
  isUpdatingUserProfile: boolean;
  formData: FormData;
  // eslint-disable-next-line
  updateUserProfile: UseMutateFunction<any, Error, ApiData, unknown>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const EditProfileModal = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    bio: '',
    link: '',
    newPassword: '',
    currentPassword: '',
  });

  const { isUpdatingUserProfile, updateUserProfile } = useUpdateProfile();
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData<IUser>(['authUser']);

  useEffect(() => {
    if (!authUser) return;

    // TODO: fix it
    setFormData({
      fullName: authUser.fullName ?? '',
      userName: authUser.userName ?? '',
      email: authUser.email ?? '',
      bio: authUser.bio ?? '',
      link: authUser.link ?? '',
      newPassword: '',
      currentPassword: '',
    });
  }, [authUser]);
  return (
    <View
      isUpdatingUserProfile={isUpdatingUserProfile}
      formData={formData}
      updateUserProfile={updateUserProfile}
      handleInputChange={handleInputChange}
    />
  );
};

const View = ({
  isUpdatingUserProfile,
  formData,
  updateUserProfile,
  handleInputChange,
}: ViewProps) => (
  <>
    <button
      className="btn btn-outline rounded-full btn-sm"
      onClick={() => {
        const modal = document.getElementById(
          'edit_profile_modal'
        ) as HTMLDialogElement | null;
        modal?.showModal();
      }}
    >
      {isUpdatingUserProfile ? 'Updating...' : 'Edit profile'}
    </button>
    <dialog id="edit_profile_modal" className="modal">
      <div className="modal-box border rounded-md border-gray-700 shadow-md">
        <h3 className="font-bold text-lg my-3">
          {' '}
          {isUpdatingUserProfile ? 'Updating...' : 'Update profile'}
        </h3>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            updateUserProfile(formData);
          }}
        >
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.fullName}
              name="fullName"
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Username"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.userName}
              name="userName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
            />
            <textarea
              placeholder="Bio"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.bio}
              name="bio"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="password"
              placeholder="Current Password"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.currentPassword}
              name="currentPassword"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="New Password"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.newPassword}
              name="newPassword"
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            placeholder="Link"
            className="flex-1 input border border-gray-700 rounded p-2 input-md"
            value={formData.link}
            name="link"
            onChange={handleInputChange}
          />
          <button className="btn btn-primary rounded-full btn-sm text-white">
            {isUpdatingUserProfile ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="outline-none">close</button>
      </form>
    </dialog>
  </>
);

export default EditProfileModal;
