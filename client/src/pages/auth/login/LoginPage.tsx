import { useState } from 'react';
import NoviagramLogo from '../../../common/ui/logos/NoviagramLogo';
import NoviaPlatformsLogo from '../../../common/ui/logos/NoviaPlatformsLogo';
import { LuEye, LuEyeOff } from 'react-icons/lu';

const SignupPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPasswordChange = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <main className="auth container">
      <div className="auth__logo">
        <NoviagramLogo />
      </div>
      <div className="auth__right-panel">
        <div className="auth__form">
          <h1 className="auth__text">Login in to Noviagram</h1>

          <label htmlFor="userName">Username</label>

          <input
            type="text"
            placeholder="Username"
            className="auth__form_input"
          />

          <div className="auth__password-container">
            <label
              htmlFor="password"
              className="auth__label auth__password_label"
            >
              Password
            </label>
            <div className="auth__password">
              <input
                name="password"
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Password"
                className="auth__form_input auth__password_input"
              />
              {isShowPassword ? (
                <LuEyeOff
                  className="auth__password_view"
                  onClick={handleShowPasswordChange}
                />
              ) : (
                <LuEye
                  className="auth__password_view"
                  onClick={handleShowPasswordChange}
                />
              )}
            </div>
          </div>
          <button type="submit" className="auth__form_submit">
            Login
          </button>
        </div>
        <button className="auth__create">Create a new account</button>
        <button className="auth__forgot">Forgot your password?</button>
        <button className="auth__google">Sign in with Google</button>
        <button className="auth__create">Create a new account</button>
        <div className="auth__platforms">
          <NoviaPlatformsLogo />
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
