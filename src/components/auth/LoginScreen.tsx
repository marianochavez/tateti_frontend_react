import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";

import {useForm} from "../../hooks/useForm";
import {Navbar} from "../ui/Navbar";
import {UserContext} from "../providers/UserProvider";

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
  const {players, isLogged, isLogged2, login} = useContext(UserContext);
  const [error, setError] = useState("");

  const {lUsername, lPassword} = formValues as LoginFormProps;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (players[parseInt(Object.keys(players)[0])]?.username === lUsername) {
      setError("El usuario ya está logeado!");

      return;
    }

    const res = await login(lUsername, lPassword);

    if (res) {
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  if (isLogged && isLogged2) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Navbar />
      <section className="nes-container is-centered animate__animated animate__fadeIn animate__slow">
        <h2 className="">Login</h2>
        {!error && <p>Ingresar usuario y contraseña!</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
        <form className="container" onSubmit={(e) => handleLogin(e)}>
          <div className="nes-field">
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
    </>
  );
};
