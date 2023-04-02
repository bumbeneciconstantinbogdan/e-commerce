import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "./App.css";
import MainPage from "./components/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { FlexBox, Text } from "@ui5/webcomponents-react";
import { createContext, useReducer } from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";

export const Context = createContext();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage children={<Home />} />,
    },
    {
      path: "/register",
      element: <MainPage children={<Register />} />,
    },
    {
      path: "/login",
      element: <MainPage children={<Login />} />,
    },
    {
      path: "/profile",
      element: <MainPage children={<Profile />} />
    },
    {
      path: "/logout",
      element: <MainPage />
    },
    {
      path: "*",
      element: (
        <FlexBox
          style={{
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "75vh",
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/393/235/original/error-404-with-the-cute-floppy-disk-mascot-free-vector.jpg"
            width="500"
            alt="Error 404"
          />
          <Text> Page {window.location.pathname} not found. </Text>
        </FlexBox>
      ),
    },
  ]);

  const initialState = { Authorization: localStorage.getItem("Authorization") };

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        localStorage.setItem("Authorization", action.payload);
        return { ...state, Authorization: action.payload };
      case "logout":
        localStorage.clear("Authorization");
        return { ...state, Authorization: "" };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
