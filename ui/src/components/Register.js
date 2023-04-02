/* eslint-disable no-useless-escape */
import {
  FormItem,
  Input,
  FormGroup,
  Text,
  Button,
  Link,
  CheckBox,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  EMAIL: "None",
  PASSWORD: "None",
  REPEATPASSWORD: "None",
  CHECKBOX: "None",
};

function reducer(state, action) {
  const { errorTable } = action.type;

  if(action.type.reset){
    return initialState;
  }
  
  if (errorTable) {
    if (errorTable[0] === 1) {
      state.EMAIL = "Error";
    } else {
      state.EMAIL = "None";
    }

    if (errorTable[1] === 1) {
      state.PASSWORD = "Error";
    } else {
      state.PASSWORD = "None";
    }

    if (errorTable[2] === 1) {
      state.REPEATPASSWORD = "Error";
    } else {
      state.REPEATPASSWORD = "None";
    }

    if (errorTable[3] === 1) {
      state.CHECKBOX = "Error";
    } else {
      state.CHECKBOX = "None";
    }
  }

  return { ...state };
}

const Register = () => {
  const [registerData, setRegisterData] = useState({
    EMAIL: "",
    PASSWORD: "",
    REPEATPASSWORD: "",
    CHECKBOX: false,
  });

  const [formState, formDispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const handleRegister = () => {
    const errorTable = [0, 0, 0, 0];
    formDispatch({type: {reset: true}})

    if (!registerData.CHECKBOX) {
      errorTable[3] = 1;
    }

    //REGEX for email validation
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        registerData.EMAIL
      ) ||
      registerData.EMAIL === ""
    ) {
      errorTable[0] = 1;
    }

    if (
      registerData.PASSWORD !== registerData.REPEATPASSWORD ||
      registerData.REPEATPASSWORD === ""
    ) {
      errorTable[1] = 1;
      errorTable[2] = 1;
    }

    
    
    if(errorTable.includes(1)){
      return formDispatch({ type: { errorTable } }); 
    }

    console.log(formState)


    const { EMAIL, PASSWORD } = registerData;

    const handleOnSuccess = (res) => {
      navigate('/login')
    };

    const handleOnError = (err) => {
      const errorMessage = err.response.data.error.message;
      // console.log(errorMessage)

      if(errorMessage.toUpperCase().includes('EMAIL')){
        errorTable[0] = 1;
        formDispatch({type: {errorTable}})
      }

      if(errorMessage.toUpperCase().includes('FORMAT')){
        errorTable[1] = 1;
        formDispatch({type: {errorTable}})
      }

    }

    axios
      .post("/ecommerce/User", { EMAIL, PASSWORD })
      .then(handleOnSuccess)
      .catch(handleOnError);

   
  };

  return (
    <FormGroup titleText="Fill with your data">
      <FormItem label="Email">
        <Input
          onChange={(e) =>
            setRegisterData((prev) => {
              return { ...prev, EMAIL: e.target.value };
            })
          }
          valueState={formState.EMAIL}
          type="Email"
        />
      </FormItem>
      <FormItem label="Password">
        <Input
          onChange={(e) =>
            setRegisterData((prev) => {
              return { ...prev, PASSWORD: e.target.value };
            })
          }
          valueState={formState.PASSWORD}
          type="Password"
        />
      </FormItem>
      <FormItem label="Repeat password">
        <Input
          onChange={(e) =>
            setRegisterData((prev) => {
              return { ...prev, REPEATPASSWORD: e.target.value };
            })
          }
          valueState={formState.REPEATPASSWORD}
          type="Password"
        />
      </FormItem>
      <FormItem label="">
        <CheckBox
          valueState={formState.CHECKBOX}
          onChange={(e) =>
            setRegisterData((prev) => {
              return { ...prev, CHECKBOX: !prev.CHECKBOX };
            })
          }
          text="I agree terms and conditions."
        />
      </FormItem>
      <FormItem label="">
        <Button onClick={handleRegister}> Register </Button>
      </FormItem>
      <FormItem label="">
        <Text>
          Navigate to the{" "}
          <Link
            accessibleRole="button"
            onClick={() => navigate("/login")}
            children={"login"}
          />{" "}
          page.
        </Text>
      </FormItem>
    </FormGroup>
  );
};

export default Register;
