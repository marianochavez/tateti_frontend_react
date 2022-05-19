import {Link} from "react-router-dom";

import {useForm} from "../../hooks/useForm";
import {Navbar} from "../ui/Navbar";

interface RegisterFormProps {
  lUsername: string;
  lPassword: string;
  lConfirmPassword: string;
}

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    lUsername: "",
    lPassword: "",
    lConfirmPassword: "",
  } as RegisterFormProps);

  const {lUsername, lPassword, lConfirmPassword} = formValues as RegisterFormProps;

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <>
      <Navbar />
      <section className="nes-container is-centered">
        <h2 className="">Registro</h2>
        <p>El usuario debe ser único!</p>
        <form className="container" onSubmit={(e) => handleRegister(e)}>
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

          <div className="nes-field">
            {/* <label htmlFor="lPassword">Contraseña</label> */}
            <input
              autoComplete="off"
              className="nes-input"
              name="lConfirmPassword"
              placeholder="Confirmar contraseña"
              type="password"
              value={lConfirmPassword}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
          </div>

          <button className="nes-btn" style={{margin: "1em"}} type="submit">
            Registrarme
          </button>
        </form>

        <div>
          <p>
            Ya tienes cuenta? <Link to="/login">Ingresar</Link>
          </p>
        </div>
      </section>
    </>
  );
};
