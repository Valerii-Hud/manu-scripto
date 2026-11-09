import './_login-page.scss';
import ctaImage from './../../assets/dummy/53X3pk-t2Gn.webp';
import noviagramLogo from '../../assets/logos/noviagram_logo_512x512.svg';
import noviagramTextLogo from '../../assets/logos/noviagram_logo_text_white.svg';
const LoginPage = () => {
  const texts = {
    cta: 'See what interesting and memorable moments your friends have shared from their lives!',
    form: {
      formCaption: 'Login Noviagram',
      inputs: {
        loginData: 'User name, Phone number or E-mail address ',
        password: 'Password',
      },
      buttons: {
        login: 'Login',
        forgotPassword: 'Forgot your password?',
        createNewAccout: 'Create new account',
      },
    },
  };
  return (
    <div className="container">
      <main className="login">
        <div>
          <img src={noviagramLogo} />
        </div>
        <div className="login__cta">
          <h1 className="login__cta__text">{texts.cta}</h1>
          <img src={ctaImage}></img>
        </div>
        <div className="login__form">
          <h2 className="login__form__caption">{texts.form.formCaption}</h2>
          <form action="#">
            <div className="login__form__item">
              <label htmlFor="loginData">{texts.form.inputs.loginData}</label>
              <input type="text" id="loginData" />
            </div>
            <div className="login__form__item">
              <label htmlFor="password">{texts.form.inputs.password}</label>
              <input type="text" id="password" />
            </div>

            <button
              type="submit"
              className="login__form__button login__form__button_blue"
            >
              {texts.form.buttons.login}
            </button>
            <button type="submit" className="login__form__button">
              {texts.form.buttons.forgotPassword}
            </button>
            <button
              type="submit"
              className="login__form__button login__form__button_transparent"
            >
              {texts.form.buttons.createNewAccout}
            </button>
            <button
              type="submit"
              className="login__form__button login__form__button_transparent"
            >
              {texts.form.buttons.createNewAccout}
            </button>
          </form>
          <img src={noviagramTextLogo} className="login__form__logo" />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
