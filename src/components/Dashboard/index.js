import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import "./styles.css";
import { useHistory } from "react-router-dom";
import divider from "../../assets/Rectangle 34.png";

function Dashboard() {
  const history = useHistory();
  const [createTech, setCreateTech] = useState(false);
  const user = JSON.parse(localStorage.getItem("@kenziehub:user"));
  const token = localStorage.getItem("@kenziehub:token");
  const [actualTech, setActualTech] = useState([]);

  useEffect(() => {
    api.get(`users/${user.id}`).then((res) => setActualTech(res.data.techs));
  }, [actualTech]);

  const formSchema = yup.object().shape({
    title: yup.string().required("Nome obrigatório"),
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
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setCreateTech(false);
  };

  return (
    <div className="dashboard">
      <header>
        Kenzie Hub <button onClick={() => history.push("/")}>Sair</button>
      </header>

      <img src={divider} alt="----" className="divider" />

      <h2>
        Olá, {user.name} <span>{user.course_module}</span>
      </h2>

      <img src={divider} alt="----" className="divider" />

      <div className="techsAdd">
        <p>
          Tecnologias <button onClick={() => setCreateTech(true)}>+</button>
        </p>

        {createTech && (
          <div className="createTech">
            <h2>
              <p>Cadastrar Tecnologia</p>
              <button onClick={() => setCreateTech(false)}>X</button>
            </h2>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <label>
                <p>
                  Nome <span>{errors.title?.message}</span>
                </p>
                <input placeholder="Nome" {...register("title")} />
              </label>
              <label>
                <p>Selecionar status</p>
                <select className="statusOptions" {...register("status")}>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </label>
              <button type="submit">Cadastrar Tecnologia</button>
            </form>
          </div>
        )}
        <div className="techs">
          {actualTech?.map((tech) => (
            <div className="tech">
              <h3>{tech.title}</h3>
              <div className="detailsTech">
                <p>{tech.status}</p>

                <button
                  onClick={() => {
                    api
                      .delete(`/users/techs/${tech.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .catch((err) => console.log(err));
                  }}
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
