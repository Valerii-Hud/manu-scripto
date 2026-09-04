const LoginPage = () => {
  return (
    <main className="login">
      <div className="login__logo">N</div>
      <div className="login__form">
        <input
          type="text"
          placeholder="Username"
          className="login__form_input"
        />
        <input
          type="text"
          placeholder="Password"
          className="login__form_input"
        />
      </div>
    </main>
  );
};

export default LoginPage;
