import { Button, Col, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import { UserContext } from "../App";

const LoginPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const onDismiss = () => setVisible(false);



  const handleFormError = (err) => {
    setError(err.response.data);
    setVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    await axios
        .post("http://localhost:5000/api/users/login", user, {
      withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
    }).then((response)=>{
      console.log(response.data);
      setUser({
        accessToken: response.data.accesstoken,
      })
        })

    // if(result.accessToken) {
    //   setUser({
    //     accessToken: result.accessToken,
    //   });
    //   console.log(result.accessToken);
    // } else {
    //   console.log(result.error);
    // }



    // axios
    //   .post("http://localhost:5000/api/users/login/", user)
    //   .then((response) => {
    //       console.log(response.data);
    //       setLoginStatus(true);
    //       console.log(loginStatus)
    //   })
    //   .catch((err) => handleFormError(err));
  };

  return (
    <div style={{ margin: "auto", width: "50vh" }}>
      <h1>Zaloguj się</h1>
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        {error ? error : null}
      </Alert>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label sm={3} for="email">
            Email
          </Label>
          <Col sm={8}>
            <Input
              type="email"
              autocomplete="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="password">
            Hasło
          </Label>
          <Col sm={8}>
            <Input
              type="password"
              autocomplete="current-password"
              name="password"
              id="password"
              placeholder="Hasło"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button type="submit">Zatwierdź</Button>
      </Form>
    </div>
  );
};
export default LoginPage;
