import './_signup-page.scss';
import ctaImage from './../../assets/dummy/53X3pk-t2Gn.webp';
import noviagramLogo from '../../assets/logos/noviagram_logo_512x512.svg';
import noviagramTextLogo from '../../assets/logos/noviagram_logo_text_black.svg';

const SignupPage = () => {
  const texts = {
    cta: 'See what interesting and memorable moments your friends have shared from their lives!',
    form: {
      formCaption: 'Signup Noviagram',
      inputs: {
        loginData: 'Phone number or E-mail',
        password: 'Password',
        fullName: 'Name and surname',
        userName: 'User name',
      },
      buttons: {
        signup: 'Sign Up',
        alreadyHaveAccount: 'I already have an account',
      },
      terms: {
        createAccount:
          'By clicking Sign Up, you agree to create an account and accept Noviagram’s Terms of Service.',
        infoCollect:
          'For more information about how we collect, use, and share your data, please read our Privacy Policy. To learn how we use cookies and similar technologies, please refer to our Cookie Policy.',
        ourPolicy:
          'Our Privacy Policy also explains how we use the information you provide when creating an account. This information helps us provide, personalize, and improve our services, including advertising.',
      },
    },
  };
  return (
    <div className="container">
      <main className="signup">
        <div>
          <img src={noviagramLogo} />
        </div>
        <div className="signup__cta">
          <h1 className="signup__cta__text">{texts.cta}</h1>
          <img src={ctaImage}></img>
        </div>
        <div className="signup__form">
          <h2 className="signup__form__caption">{texts.form.formCaption}</h2>
          <form action="#">
            <div className="signup__form__item">
              <label htmlFor="loginData">{texts.form.inputs.loginData}</label>
              <input type="text" id="loginData" autoComplete="email" />
            </div>
            <div className="signup__form__item">
              <label htmlFor="password">{texts.form.inputs.password}</label>
              <input
                type="text"
                id="password"
                autoComplete="current-password"
              />
            </div>
            <div className="signup__form__item">
              <label htmlFor="fullName">{texts.form.inputs.fullName}</label>
              <input type="text" id="fullName" autoComplete="name" />
            </div>
            <div className="signup__form__item">
              <label htmlFor="userName">{texts.form.inputs.userName}</label>
              <input type="text" id="userName" autoComplete="username" />
            </div>
            <div className="signup__form__terms">
              <p>{texts.form.terms.createAccount}</p>
              <p>{texts.form.terms.infoCollect}</p>
              <p>{texts.form.terms.ourPolicy}</p>
            </div>

            <div className="signup__form__buttons">
              <button
                type="submit"
                className="signup__form__button signup__form__button_accent"
              >
                {texts.form.buttons.signup}
              </button>
              <button
                type="submit"
                className="signup__form__button signup__form__button_ghost"
              >
                {texts.form.buttons.alreadyHaveAccount}
              </button>
            </div>
          </form>
          <img src={noviagramTextLogo} alt="" className="signup__text__logo" />
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
