import { Link } from 'react-router-dom';
import { useState, type ChangeEvent, type FormEvent } from 'react';

import useAuth from '../../../hooks/useAuth';
import NSvg from '../../../components/svgs/N';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SignupData } from '@/api/api';

interface ViewProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: SignupData;
  isAuthentication: boolean;
  isAuthenticationError: boolean;
  authenticationError: Error | null;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const {
    auth: signup,
    authenticationError,
    isAuthentication,
    isAuthenticationError,
  } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ data: formData, endpoint: 'signup' });
  };
  console.log(
    `
    ${isAuthenticationError} ${isAuthentication}`
  );
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <View
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      formData={formData}
      isAuthentication={isAuthentication}
      isAuthenticationError={isAuthenticationError}
      authenticationError={authenticationError}
    />
  );
};

const View = ({
  handleSubmit,
  handleInputChange,
  formData,
  isAuthentication,
  isAuthenticationError,
}: ViewProps) => (
  <form
    className="flex w-full min-h-screen justify-center items-center gap-20"
    onSubmit={handleSubmit}
  >
    <NSvg fill="black" className="hidden md:block h-100" />
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
        <CardAction>
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                required
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {!isAuthentication && !isAuthenticationError ? 'Login' : 'Loading...'}
        </Button>
        {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
  </form>
);

export default SignUpPage;
