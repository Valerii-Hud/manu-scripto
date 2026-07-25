import { Link } from 'react-router-dom';
import { useState, type ChangeEvent, type FormEvent } from 'react';

import XSvg from '../../../components/svgs/X';

import { MdOutlineMail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  interface FormData {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    confirmPassword: string;
  }
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    fullName: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
  });

  const {
    mutate: signup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      email,
      userName,
      fullName,
      password,
      phoneNumber,
      confirmPassword,
    }: FormData) => {
      try {
        const res = await api
          .post('/api/v1/auth/signup', {
            email,
            userName,
            fullName,
            password,
            phoneNumber,
            confirmPassword,
          })
          .catch((error) => {
            if (error?.response) {
              toast.error(error.response.data.error);
            }
          });
        return res;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.response?.data.error);
          toast.error(error.response?.data.error);
        }
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="tel"
              className="grow"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleInputChange}
              value={formData.phoneNumber}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="userName"
                onChange={handleInputChange}
                value={formData.userName}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? 'Sign up' : 'Loading'}
          </button>
          {isError && (
            <p className="text-red-500">
              {error ? error.message : 'Something went wrong'}
            </p>
          )}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
