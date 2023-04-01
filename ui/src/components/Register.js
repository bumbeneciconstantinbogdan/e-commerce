import React from "react";

import {
  Form,
  FormItem,
  Input,
  FormGroup,
  Text,
  Button,
  Link,
  CheckBox,
} from "@ui5/webcomponents-react";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
      titleText="Register Form"
    >
      <FormGroup titleText="Fill with your data">
        <FormItem label="Email">
          <Input type="Email" />
        </FormItem>
        <FormItem label="Password">
          <Input type="Password" />
        </FormItem>
        <FormItem label="Repeat password">
          <Input type="Password" />
        </FormItem>
        <FormItem label="">
          <CheckBox text="I agree terms and conditions." />
        </FormItem>
        <FormItem label="">
          <Button> Register </Button>
        </FormItem>
        <FormItem label="">
          <Text>
            To the{" "}
            <Link
              accessibleRole="button"
              onClick={() => navigate("/login")}
              children={"login"}
            />
            .
          </Text>
        </FormItem>
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

export default Register;
