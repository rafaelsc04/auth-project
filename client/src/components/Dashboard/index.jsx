import React from "react";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { AuthContext } from "../../App";

export const Dashboard = () => {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => { 
    authContext.setLogoutVisibility(false);
  })

  return (
    <Result
      icon={<SmileOutlined />}
      title={"Bem vindo, " + authContext.user + "!"}
      subTitle="Essa é uma rota protegida, isso quer dizer que só é possível acessá-la se você estiver autenticado."
    />
  );
};
