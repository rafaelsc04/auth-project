import React from "react";
import { Form, Input, Button, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { Formulario } from "./styles";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import axios from "axios";

const openNotificationWithIcon = (type, { message, description, duration }) => {
  notification[type]({
    message: message,
    description: description,
    placement: "bottomLeft",
    duration: duration,
  });
};

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
    .max(15, "O nome de usuário pode ter no máximo 15 caracteres.")
    .required("O nome de usuário é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres."),
  email: yup
    .string()
    .email("O email deve ser válido.")
    .required("O email é obrigatório."),
});

export const RegisterForm = () => {
  const [showLoading, setShowLoading] = React.useState(true);
  const history = useHistory();

  // Formik settings
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // show loading
      setShowLoading(false);
      // request
      axios
        .post("/api/register", values)
        .then((response) => {
          // success case
          // hide loading
          setShowLoading(true);
          setTimeout(() => {
            history.push("/login"); // redirect (5s)
          }, 5000);

          // show success notification
          openNotificationWithIcon("success", {
            message: "Cadastro realizado com sucesso!",
            description:
              "Obrigado por testar meu projeto! Você será redirecionado para o login.",
            duration: 4,
          });
        })
        // error handling
        .catch((error) => {
          // show error notification, with err message brought from the backend
          openNotificationWithIcon("error", {
            message: "Não foi possível realizar seu cadastro.",
            description: error.response.data.message,
            duration: 4.5,
          });
          setShowLoading(true); // hidding loading
          formik.resetForm(); // cleaning the form, so the user can reenter the wrong data
        });
    },
  });

  return (
    <Formulario
      layout="vertical"
      name="cadastro"
      scrollToFirstError
      size="medium"
      onFinish={formik.handleSubmit}
    >
      <Form.Item
        validateStatus={formik.errors.username ? "error" : "validating"}
        help={formik.errors.username}
        tooltip="O nome que você usará para entrar no app."
        label="Nome de usuário"
        labelAlign="left"
      >
        <Input
          value={formik.values.username}
          onChange={formik.handleChange}
          prefix={<UserOutlined />}
          name="username"
        />
      </Form.Item>
      <Form.Item
        validateStatus={formik.errors.password ? "error" : "validating"}
        help={formik.errors.password}
        tooltip="A senha que você usará para autenticar no app."
        label="Senha"
        labelAlign="left"
      >
        <Input
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          prefix={<LockOutlined />}
          name="password"
        />
      </Form.Item>
      <Form.Item
        validateStatus={formik.errors.email ? "error" : "validating"}
        help={formik.errors.email}
        tooltip="Seu email para eventualmente entrarmos em contato."
        label="Email"
        labelAlign="left"
      >
        <Input
          value={formik.values.email}
          onChange={formik.handleChange}
          prefix={<MailOutlined />}
          name="email"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
        <LoadingOutlined hidden={showLoading} style={{ marginLeft: "1rem" }} />
      </Form.Item>
    </Formulario>
  );
};
