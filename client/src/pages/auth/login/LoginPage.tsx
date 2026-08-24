// import { useState, type ChangeEvent, type FormEvent } from 'react';
// import { Link } from 'react-router-dom';

// import XSvg from '../../../components/svgs/N';

// import { MdOutlineMail } from 'react-icons/md';
// import { MdPassword } from 'react-icons/md';
// import useAuth from '../../../hooks/useAuth';

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

// interface FormData {
//   userName: string;
//   password: string;
// }
// interface ViewProps {
//   handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
//   handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   formData: FormData;
//   isAuthentication: boolean;
//   isAuthenticationError: boolean;
//   authenticationError: Error | null;
// }

const LoginPage = () => {
  // const [formData, setFormData] = useState<FormData>({
  //   userName: '',
  //   password: '',
  // });

  // const {
  //   auth: login,
  //   isAuthentication,
  //   authenticationError,
  //   isAuthenticationError,
  // } = useAuth();

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   login({ data: formData, endpoint: 'login' });
  // };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  return (
    // <View
    //   handleSubmit={handleSubmit}
    //   handleInputChange={handleInputChange}
    //   formData={formData}
    //   isAuthentication={isAuthentication}
    //   isAuthenticationError={isAuthenticationError}
    //   authenticationError={authenticationError}
    // />
    <View />
  );
};

// const View = ({
//   handleSubmit,
//   handleInputChange,
//   formData,
//   isAuthentication,
//   isAuthenticationError,
//   authenticationError,
// }: ViewProps) => (
//   <div className="max-w-screen-xl mx-auto flex h-screen">
//     <div className="flex-1 hidden lg:flex items-center  justify-center">
//       <XSvg className="lg:w-2/3 fill-white" />
//     </div>
//     <div className="flex-1 flex flex-col justify-center items-center">
//       <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
//         <XSvg className="w-24 lg:hidden fill-white" />
//         <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
//         <label className="input input-bordered rounded flex items-center gap-2">
//           <MdOutlineMail />
//           <input
//             type="text"
//             className="grow"
//             placeholder="Username"
//             name="userName"
//             onChange={handleInputChange}
//             value={formData.userName}
//           />
//         </label>

//         <label className="input input-bordered rounded flex items-center gap-2">
//           <MdPassword />
//           <input
//             type="password"
//             className="grow"
//             placeholder="Password"
//             name="password"
//             onChange={handleInputChange}
//             value={formData.password}
//           />
//         </label>
//         <button className="btn rounded-full btn-primary text-white">
//           {isAuthentication ? 'Loading...' : 'Login'}
//         </button>
//         {isAuthenticationError && (
//           <p className="text-red-500">
//             {authenticationError
//               ? authenticationError.message
//               : 'Something went wrong'}{' '}
//           </p>
//         )}
//       </form>
//       <div className="flex flex-col gap-2 mt-4">
//         <p className="text-white text-lg">{"Don't"} have an account?</p>
//         <Link to="/signup">
//           <button className="btn rounded-full btn-primary text-white btn-outline w-full">
//             Sign up
//           </button>
//         </Link>
//       </div>
//     </div>
//   </div>
// );

const View = () => (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
      <CardAction>
        <Button variant="link">Sign Up</Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
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
            <Input id="password" type="password" required />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button variant="outline" className="w-full">
        Login with Google
      </Button>
    </CardFooter>
  </Card>
);
export default LoginPage;
