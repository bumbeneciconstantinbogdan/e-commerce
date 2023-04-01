import React, { useRef, useState, useContext } from "react";
import {
  Form,
  FormItem,
  Input,
  FormGroup,
  Text,
  Button,
  Link,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { Context } from "./MainPage";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [stat, setStat] = useState({ EMAIL: "None", PASSWORD: "None" });
  const { setLogedIn } = useContext(Context);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate()


  const handleLogin = async () => {
    const EMAIL = emailRef.current.value;
    const PASSWORD = passRef.current.value;
    // fetch("/ecommerce/login", { method: "POST", headers: {"Content-Type": "application/json"} , body: JSON.stringify({ EMAIL, PASSWORD }) })
    //   .then(data => console.log(data))
    //   .catch(e =>console.error(e.body));
    axios
      .post("/ecommerce/login", { EMAIL, PASSWORD })
      .then(() => {
        setStat({ EMAIL: "None", PASSWORD: "None" });
        setLogedIn((prev) => true);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.error.message === "User with email  doesn't exists."
        ) {
          setStat({ EMAIL: "Error", PASSWORD: "Error" });
        }

        if (err.response.data.error.message === "Password is incorrect.") {
          setStat({ EMAIL: "Success", PASSWORD: "Error" });
        }
      });
  };

  return (
    <Form
      backgroundDesign="Transparent"
      columnsL={1}
      columnsM={1}
      columnsS={1}
      columnsXL={1}
      labelSpanL={3}
      labelSpanM={3}
      labelSpanS={12}
      labelSpanXL={3}
      style={{
        alignItems: "center",
        width: "100%",
        margin: "auto",
        padding: "1em 1em",
      }}
      titleText="Login Form"
    >
      <FormGroup titleText="Enter you email and password">
        <FormItem label="Email">
          <Input valueState={stat.EMAIL} ref={emailRef} type="Email" />
        </FormItem>
        <FormItem label="Password">
          <Input valueState={stat.PASSWORD} ref={passRef} type="Password" />
        </FormItem>
        <FormItem label="">
          <Button onClick={handleLogin} style={{ width: "500" }}>
            {" "}
            Login{" "}
          </Button>
        </FormItem>
        <FormItem label="">
          <Text>
            To the{" "}
            <Link
              accessibleRole="button"
              onClick={() => navigate("/register")}
              children={"register"}
            />
            .
          </Text>
        </FormItem>
        {/* <FormItem label="I want to receive the newsletter">
          <CheckBox />
        </FormItem> */}
      </FormGroup>
      <FormGroup titleText="General Info">
        <FormItem label="Client">
          <Link href="http://localhost:3000">htttp://localhost:3000</Link>
        </FormItem>
        <FormItem label="Server">
          <Link href="http://localhost:4004">htttp://localhost:4004</Link>
        </FormItem>
        <FormItem label="Email">
          <Link>cbumbeneci@stud.electro.upb.ro</Link>
        </FormItem>
        <FormItem label="">
          <Link>alecu.mihnea@stud.electro.upb.ro</Link>
        </FormItem>
        <FormItem label="Homework for">
          <Text>Politehnica - IEIA I - SIAE</Text>
        </FormItem>
        <FormItem label="Address">
          <Text>Bucharest, Romania</Text>
        </FormItem>
      </FormGroup>
    </Form>
  );
};

export default Login;
