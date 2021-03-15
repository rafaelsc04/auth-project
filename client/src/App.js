import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Topbar } from "./components/Topbar";
import { Footer } from "./components/Footer";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Dashboard } from "./components/Dashboard";
import { createGlobalStyle } from "styled-components";
import { PrivateRoute } from "./PrivateRoute";
import styled from "styled-components";
import "./App.css";

export const AuthContext = createContext();

const Content = styled.div`
  height: calc(100% - 10rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlobalStyle = createGlobalStyle`
  *, html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    font-weight: 100;
  }
  body, html, #root {
    max-width: 100vw;
    width: 100%;
    max-height: 100vh;
    height: 100%;
  }
`;

function App() {
  const [jwt, setJwt] = React.useState();
  const [user, setUser] = React.useState();
  const [logout, setLogoutVisibility] = React.useState(true);

  const value = { jwt, setJwt, user, setUser, logout, setLogoutVisibility };

  return (
    <Router>
      <GlobalStyle />
      <AuthContext.Provider value={value}>
        <Topbar />
        <Content>
          <Switch>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <PrivateRoute path="/dashboard" component={() => <Dashboard />} />
          </Switch>
        </Content>
      </AuthContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
