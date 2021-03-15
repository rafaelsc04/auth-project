import React from "react";
import { Button, Bar, ButtonContainer } from "./styles.js";
import { useHistory } from "react-router";
import { AuthContext } from "../../App";

export const Topbar = () => {
  const authContext = React.useContext(AuthContext);

  const history = useHistory();

  function logout() {
    authContext.setLogoutVisibility(true);
    localStorage.removeItem("jwt");
    history.push("/");
  }

  return (
    <Bar>
      <span>Authentication</span>
      <ButtonContainer>
        <Button hidden={authContext.logout} onClick={logout} to="/logout">
          Logout
        </Button>
        <Button hidden={!authContext.logout} to="/login">
          Login
        </Button>
        <Button hidden={!authContext.logout} to="/register">
          Register
        </Button>
      </ButtonContainer>
    </Bar>
  );
};
