import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

function Login({ setAuthenticated }) {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$",
        "Senha fraca"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        localStorage.setItem("@kenziehub:token", res.data.token);
        localStorage.setItem("@kenziehub:user", JSON.stringify(res.data.user));
      })
      .catch((err) => console.log(err));

    setAuthenticated(true);
    history.push("/dashboard");
  };

  return (
    <>
      <header>Kenzie Hub</header>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Login</h2>
        <label>
          <p>
            Email <span>{errors.email?.message}</span>
          </p>
          <input
            type="email"
            placeholder="Digite aqui seu email"
            {...register("email")}
          />
        </label>
        <label>
          <p>
            Senha <span>{errors.password?.message}</span>
          </p>
          <input
            type="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
        </label>
        <button type="submit">Entrar</button>
        <p>
          <span>Ainda não possui uma conta?</span>
        </p>
        <button
          className="redirectRegistration"
          onClick={() => history.push("/cadastro")}
        >
          Cadastre-se
        </button>
      </form>
    </>
  );
}

export default Login;
