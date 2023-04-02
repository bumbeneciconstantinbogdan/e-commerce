import { useContext, useReducer, useState } from "react";
import {
  FormItem,
  Input,
  FormGroup,
  Text,
  Button,
  Link,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { Context } from "../App";
import { useNavigate } from "react-router";

const initialState = { EMAIL: "None", PASSWORD: "None" };

function reducer(state, action) {
  switch (action.type) {
    case "emailError":
      return {...state, EMAIL: "Error", PASSWORD: "Error" };
    case "passwordError":
      return {...state, EMAIL: "Success", PASSWORD: "Error" };
    default:
      throw new Error();
  }
}

const Login = () => {
  const [ loginData, setLoginData ] = useState({EMAIL: "", PASSWORD: ""})
  
  const { dispatch } = useContext(Context);
  
  const [ formState, formDispatch ] = useReducer(reducer, initialState);
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { EMAIL, PASSWORD } = loginData;

    const handleOnError = (err) => {
      const sErrorMessage = err.response.data.error.message;

      if (sErrorMessage.toUpperCase().includes('EMAIL') ) {
        formDispatch({type: 'emailError'});
      }

      if (sErrorMessage.toUpperCase().includes('PASSWORD')) {
        formDispatch({type: 'passwordError'});
      }
    };

    const handleOnSuccess = (res) => {
        localStorage.setItem("EMAIL", loginData.EMAIL)
        dispatch({ type: "login", payload: res.data.value });
        navigate('/');
    }

    axios
      .post("/ecommerce/login", { EMAIL, PASSWORD })
      .then(handleOnSuccess)
      .catch(handleOnError);
  };

  return (
    <FormGroup titleText="Enter you email and password">
      <FormItem label="Email">
        <Input  valueState={formState.EMAIL} onChange={(e)=>setLoginData(prev => {return {...prev, EMAIL: e.target.value}})} type="Email" />
      </FormItem>
      <FormItem label="Password">
        <Input  valueState={formState.PASSWORD} onChange={(e)=>setLoginData(prev => {return {...prev, PASSWORD: e.target.value}})} type="Password" />
      </FormItem>
      <FormItem label="">
        <Button onClick={handleLogin} style={{ width: "500" }}>
          {" "}
          Login{" "}
        </Button>
      </FormItem>
      <FormItem label="">
        <Text>
          Navigate to the <Link onClick={()=>navigate('/register')} accessibleRole="button" children={"register"} /> page.
        </Text>
      </FormItem>
      {/* <FormItem label="I want to receive the newsletter">
          <CheckBox />
        </FormItem> */}
    </FormGroup>
  );
};

export default Login;
