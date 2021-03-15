import React from "react";
import { useFormik } from "formik";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, notification } from "antd";
import { Formulario } from "./styles";
import { AuthContext } from "../../App";
import { useHistory } from "react-router";
import axios from "axios";

const openNotificationWithIcon = (type, { message, description, duration }) => {
  notification[type]({
    message: message,
    description: description,
    placement: "bottomLeft",
    duration: duration,
  });
};

export const LoginForm = () => {
  const authContext = React.useContext(AuthContext);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("/api/login", values)
        .then((response) => {
          localStorage.setItem("jwt", response.data.token);
          authContext.setUser(values.username);
          openNotificationWithIcon("success", {
            description: "Você será redirecionado para rota protegida.",
            duration: 4,
          });
          setTimeout(() => {
            history.push("/dashboard");
          }, 4500);
        })
        .catch((error) => {
          openNotificationWithIcon("error", {
            message: "Não foi possível realizar o login.",
            description: error.response.data.message,
            duration: 4.5,
          });
          formik.resetForm();
        });
    },
  });

  return (
    <Formulario
      layout="vertical"
      name="entrar"
      scrollToFirstError
      size="medium"
      onFinish={formik.handleSubmit}
    >
      <Formulario.Item
        label="Nome de usuário"
        labelAlign="left"
        tooltip="O nome de usuário que você usou no cadastro."
      >
        <Input
          value={formik.values.username}
          onChange={formik.handleChange}
          prefix={<UserOutlined />}
          name="username"
        />
      </Formulario.Item>
      <Formulario.Item
        label="Senha"
        labelAlign="left"
        tooltip="A senha que você usou no cadastro."
      >
        <Input
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          prefix={<LockOutlined />}
          name="password"
        />
      </Formulario.Item>
      <Formulario.Item>
        <Button type="primary" htmlType="submit">
          Entrar
        </Button>
      </Formulario.Item>
    </Formulario>
  );
};
