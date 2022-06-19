import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import './styles.css'

function Registration() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches(
        "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$",
        "Permitido apenas letras"
      ),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$",
        "Senha fraca"
      ),
    passwordConfirm: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password")], "Senhas não coincidem"),
    bio: yup.string().required("Fale sobre você"),
    contact: yup.string().required("Adicione um contato"),
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
      .post("/users", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    history.push("/");
  };

  return (
    <>
      <header className="headerRegistration">
        Kenzie Hub <button onClick={() => history.push("/")}>Voltar</button>
      </header>
      <form
        className="formRegistration"
        onSubmit={handleSubmit(onSubmitFunction)}
      >
        <h2>Crie sua conta</h2>
        <p><span>Rapido e grátis, vamos nessa</span></p>
        <label>
          <p>
            Nome <span>{errors.name?.message}</span>
          </p>
          <input
            type="text"
            placeholder="Digite aqui seu nome"
            {...register("name")}
          />
        </label>
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
        <label>
          <p>
            Confirmar senha <span>{errors.passwordConfirm?.message}</span>
          </p>
          <input
            type="password"
            placeholder="Digite novamente sua senha"
            {...register("passwordConfirm")}
          />
        </label>
        <label>
          <p>
            Bio <span>{errors.bio?.message}</span>
          </p>
          <input
            type="text"
            placeholder="Fale sobre você"
            {...register("bio")}
          />
        </label>
        <label>
          <p>
            Contato <span>{errors.contact?.message}</span>
          </p>
          <input
            type="text"
            placeholder="Opção de contato"
            {...register("contact")}
          />
        </label>
        <label>
          <p>Selecionar módulo</p>
          <select className="moduleOptions" {...register("course_module")}>
           
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro Módulo
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo Módulo
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro Módulo
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto Módulo
            </option>
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default Registration;
