import { useState } from 'react';
import NoviagramLogo from '../../../common/ui/logos/NoviagramLogo';
import NoviaPlatformsLogo from '../../../common/ui/logos/NoviaPlatformsLogo';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

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
          <h1 className="auth__text">Sign up for Noviagram</h1>

          <label htmlFor="phoneOrEmail" className="auth__label">
            Phone number or email address
          </label>
          <input
            name="phoneOrEmail"
            type="text"
            placeholder="Phone number or email address"
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
                <FaEyeSlash
                  className="auth__password_view"
                  onClick={handleShowPasswordChange}
                />
              ) : (
                <FaEye
                  className="auth__password_view"
                  onClick={handleShowPasswordChange}
                />
              )}
            </div>
          </div>
          <div className="auth__birthday-container">
            <label htmlFor="birth" className="auth__label">
              Date of birth
            </label>
            <div className="auth__birthday">
              <input
                type="number"
                placeholder="Day"
                className="auth__form_input auth__birthday_input"
              />
              <input
                type="number"
                placeholder="Month"
                className="auth__form_input auth__birthday_input"
              />
              <input
                type="number"
                placeholder="Year"
                className="auth__form_input auth__birthday_input"
              />
            </div>
          </div>
          <label htmlFor="fullName" className="auth__label">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Full Name"
            className="auth__form_input"
          />
          <label htmlFor="userName">Username</label>

          <input
            type="text"
            placeholder="Username"
            className="auth__form_input"
          />
          <button type="submit" className="auth__form_submit">
            Signup
          </button>
        </div>
        <button className="auth__create">Create a new account</button>
        <div className="auth__platforms">
          <NoviaPlatformsLogo />
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
