import React, { useEffect, createContext } from "react";

import {
  Input,
  ShellBar,
  Avatar,
  ShellBarItem,
  Icon,
} from "@ui5/webcomponents-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Context = createContext()


const MainPage = ({ children, logedIn, setLogedIn = undefined }) => {
  const location = useLocation();
  const navigate = useNavigate();



  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    switch (location.pathname) {
      case "/register":
        return;
      case "/login":
        return;
      case "/logout":
        setLogedIn(() => false);
      // eslint-disable-next-line no-fallthrough
      default: {
        !logedIn && navigate("/login");
        return;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, logedIn, setLogedIn]);

  return (
    <>
      <ShellBar
        logo={
          <img
            alt="Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Color_wire_green_yellow.svg/2560px-Color_wire_green_yellow.svg.png"
          />
        }
        // menuItems={
        //   <>
        //     <StandardListItem data-key="1">Menu Item 1</StandardListItem>
        //     <StandardListItem data-key="2">Menu Item 2</StandardListItem>
        //     <StandardListItem data-key="3">Menu Item 3</StandardListItem>
        //   </>
        // }
        notificationsCount="10"
        onCoPilotClick={function ka() {}}
        onLogoClick={function ka() {}}
        onMenuItemClick={function ka() {}}
        onNotificationsClick={function ka() {}}
        onProductSwitchClick={function ka() {}}
        onProfileClick={function ka() {}}
        primaryTitle="SIAE"
        profile={
          logedIn && (
            <Avatar>
              <img
                src="https://sap.github.io/ui5-webcomponents-react/assets/Person-eb847016.png"
                alt="avatar"
              />
            </Avatar>
          )
        }
        searchField={
          logedIn && (
            <Input icon={<Icon interactive name="search" />} showClearIcon />
          )
        }
        secondaryTitle="Project"
        showCoPilot={logedIn}
        showNotifications={logedIn}
        showProductSwitch={logedIn}
      >
        {logedIn && <ShellBarItem count="3" icon="add" text="ShellBarItem" />}
      </ShellBar>
      <Context.Provider value={{setLogedIn}}>
        {children}
      </Context.Provider>
    </>
  );
};

export default MainPage;
