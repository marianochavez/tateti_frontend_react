import {Link, useNavigate} from "react-router-dom";

import {signIn} from "../../helpers/authApi";
import {useForm} from "../../hooks/useForm";

interface LoginFormProps {
  lUsername: string;
  lPassword: string;
}

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    lUsername: "",
    lPassword: "",
  } as LoginFormProps);
  const navigate = useNavigate();

  const {lUsername, lPassword} = formValues as LoginFormProps;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn(lUsername, lPassword);

    if (res) {
      const localData = JSON.parse(localStorage.getItem("players") || "{}");

      localStorage.setItem(
        "players",
        JSON.stringify({
          ...localData,
          [res.data.id]: {
            username: res.data.username,
            name: res.data.name,
            token: res.data.token,
          },
        }),
      );
      navigate("/");
    }
  };

  return (
    <section className="nes-container is-centered">
      <h2 className="">Login</h2>
      <p>Ingresar usuario y contraseña!</p>
      <form className="container" onSubmit={(e) => handleLogin(e)}>
        <div className="nes-field">
          {/* <label htmlFor="lUsername">Username</label> */}
          <input
            required
            autoComplete="off"
            className="nes-input"
            name="lUsername"
            placeholder="Usuario"
            type="text"
            value={lUsername}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
          />
        </div>

        <div className="nes-field">
          {/* <label htmlFor="lPassword">Contraseña</label> */}
          <input
            autoComplete="off"
            className="nes-input"
            name="lPassword"
            placeholder="Contraseña"
            type="password"
            value={lPassword}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
          />
        </div>

        <button className="nes-btn" style={{margin: "1em"}} type="submit">
          Ingresar
        </button>
      </form>

      <div>
        <p>
          No tienes cuenta? <Link to="/register">Registrarme</Link>
        </p>
      </div>
    </section>
  );
};
