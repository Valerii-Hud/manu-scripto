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
    <main className="signup container">
      <div className="signup__logo">
        <NoviagramLogo />
      </div>
      <div className="signup__right-panel">
        <div className="signup__form">
          <h1 className="signup__text">Sign up for Noviagram</h1>

          <label htmlFor="phoneOrEmail" className="signup__label">
            Phone number or email address
          </label>
          <input
            name="phoneOrEmail"
            type="text"
            placeholder="Phone number or email address"
            className="signup__form_input"
          />
          <div className="signup__password-container">
            <label
              htmlFor="password"
              className="signup__label signup__password_label"
            >
              Password
            </label>
            <div className="signup__password">
              <input
                name="password"
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Password"
                className="signup__form_input signup__password_input"
              />
              {isShowPassword ? (
                <FaEyeSlash
                  className="signup__password_view"
                  onClick={handleShowPasswordChange}
                />
              ) : (
                <FaEye
                  className="signup__password_view"
                  onClick={handleShowPasswordChange}
                />
              )}
            </div>
          </div>
          <div className="signup__birthday-container">
            <label htmlFor="birth" className="signup__label">
              Date of birth
            </label>
            <div className="signup__birthday">
              <input
                type="number"
                placeholder="Day"
                className="signup__form_input signup__birthday_input"
              />
              <input
                type="number"
                placeholder="Month"
                className="signup__form_input signup__birthday_input"
              />
              <input
                type="number"
                placeholder="Year"
                className="signup__form_input signup__birthday_input"
              />
            </div>
          </div>
          <label htmlFor="fullName" className="signup__label">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Full Name"
            className="signup__form_input"
          />
          <label htmlFor="userName">Username</label>

          <input
            type="text"
            placeholder="Username"
            className="signup__form_input"
          />
          <button type="submit" className="signup__form_submit">
            Signup
          </button>
        </div>
        <button className="signup__create">Create a new account</button>
        <div className="signup__platforms">
          <NoviaPlatformsLogo />
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
