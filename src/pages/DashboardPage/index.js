import { useHistory } from "react-router-dom";
import Dashboard from "../../components/Dashboard";

function DashboardPage({ authenticated }) {
  const history = useHistory();

  if (!authenticated) {
    history.push("/");
  }

  return <Dashboard />;
}

export default DashboardPage;
