import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';

import NSvg from '@/components/svgs/N';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface FormData {
  userName: string;
  password: string;
}
interface ViewProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  isAuthentication: boolean;
  isAuthenticationError: boolean;
  authenticationError: Error | null;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    password: '',
  });

  const {
    auth: login,
    isAuthentication,
    authenticationError,
    isAuthenticationError,
  } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ data: formData, endpoint: 'login' });
  };

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
  isAuthenticationError,
  isAuthentication,
}: ViewProps) => (
  <form
    className="flex w-full min-h-screen justify-center items-center gap-20"
    onSubmit={handleSubmit}
  >
    <NSvg fill="black" className="hidden md:block h-100" />
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/signup">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
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
export default LoginPage;
