import { useContext, useEffect } from "react";
import {
  ShellBar,
  FormGroup,
  FormItem,
  Link,
  Text,
  Form,
  Icon,
} from "@ui5/webcomponents-react";
import axios from "axios";

import { Context } from "../App";
import { useLocation, useNavigate } from "react-router";

const MainPage = ({ children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const navigate = useNavigate();
  const location = useLocation();

  const { state, dispatch } = useContext(Context);

  useEffect(() => {

    if(location.pathname === "/logout"){
      dispatch({type: "logout"})
    }

    const handleRouteOnError = () => {
      switch (location.pathname) {
        case "/register":
        case "/login":
          break;
        default:
          navigate("/login");
          break;
      }
    };

    axios
      .get("/ecommerce", {
        headers: {
          Authorization: state.Authorization,
        },
      })
      // .then(console.log)
      .catch(handleRouteOnError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navigate, state.Authorization]);

  return (
    <>
      <ShellBar
        logo={
          <img
            alt="Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Color_wire_green_yellow.svg/2560px-Color_wire_green_yellow.svg.png"
          />
        }
        onLogoClick={() => navigate("/")}
        onProductSwitchClick={function ka() {}}
        primaryTitle="SIAE"
        profile={
         state.Authorization && <Icon style={{scale: "1.25"}} design="Contrast"  name="employee">
            {/* <Icon name="account" /> */}
          </Icon>
        }

        onProfileClick={()=> navigate('/profile')}
        secondaryTitle="Project"
        showCoPilot={state.Authorization && true}
      ></ShellBar>
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
        titleText={location.pathname.slice(1).toUpperCase() || "HOME"}
      >
        {children}
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
    </>
  );
};

export default MainPage;
