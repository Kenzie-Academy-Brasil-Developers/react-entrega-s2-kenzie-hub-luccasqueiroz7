import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";


function Routes() {
  
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("@kenziehub:token")
    console.log(token);

    if (token) {
      setAuthenticated(true)
    }

  },[authenticated])

  return (
    <Switch>
      <Route exact path="/">
        <LoginPage setAuthenticated={setAuthenticated}/>
      </Route>

      <Route exact path="/cadastro">
        <RegistrationPage />
      </Route>

      <Route exact path="/dashboard">
        <DashboardPage authenticated={authenticated}/>
      </Route>
    </Switch>
  );
}

export default Routes;
