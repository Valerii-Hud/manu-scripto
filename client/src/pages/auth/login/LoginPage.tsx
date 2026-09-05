import { useState } from 'react';
import NoviagramLogo from '../../../common/ui/logos/NoviagramLogo';
import NoviaPlatformsLogo from '../../../common/ui/logos/NoviaPlatformsLogo';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPasswordChange = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <main className="login">
      <div className="login__logo">
        <NoviagramLogo />
      </div>
      <div className="login__right-panel">
        <div className="login__form">
          <h1 className="login__text">Login in to Noviagram</h1>
          <input
            type="text"
            placeholder="Username"
            className="login__form_input"
          />
          <div className="login__password">
            <input
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Password"
              className="login__form_input login__password_input"
            />
            {isShowPassword ? (
              <FaEyeSlash
                className="login__password_view"
                onClick={handleShowPasswordChange}
              />
            ) : (
              <FaEye
                className="login__password_view"
                onClick={handleShowPasswordChange}
              />
            )}
          </div>
          <button type="submit" className="login__form_submit">
            Login
          </button>
        </div>
        <button className="login__forgot">Forgot your password?</button>
        <button className="login__google">Sign in with Google</button>
        <button className="login__create">Create a new account</button>
        <div className="login__platforms">
          <NoviaPlatformsLogo />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
