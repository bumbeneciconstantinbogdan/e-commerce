import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "./App.css";
import MainPage from "./components/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { FlexBox, Text } from "@ui5/webcomponents-react";
import { useState } from "react";

function App() {
  const [logedIn, setLogedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage logedIn={logedIn} children={<>Home</>} />,
    },
    {
      path: "/register",
      element: <MainPage logedIn={logedIn} children={<Register />} />,
    },
    {
      path: "/login",
      element: <MainPage logedIn={logedIn} children={<Login />} />,
    },
    {
      path: "/logout",
      element: <MainPage logedIn={logedIn} setLogedIn={setLogedIn} />,
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
