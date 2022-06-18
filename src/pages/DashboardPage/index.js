import { useHistory } from "react-router-dom";
import Dashboard from "../../components/Dashboard";

function DashboardPage({ authenticated }) {
  const history = useHistory();


  /* Só pra estilizar */
  if (!authenticated) {
    history.push("/");
  }

  return <Dashboard />;
}

export default DashboardPage;
