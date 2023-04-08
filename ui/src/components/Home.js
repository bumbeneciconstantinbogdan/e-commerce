import { Button, FlexBox, FormGroup, FormItem } from "@ui5/webcomponents-react";

import PLC from "../assets/PLC.png";
import PLCIO from "./PLCIO";

const Home = () => {
  return (
    <FormGroup titleText="Main App">
      <FormItem>
        <FlexBox
          justifyContent="SpaceAround"
          alignItems="Center"
          style={{ width: "100%", gap: 10, marginLeft: 100 }}
        >
          <img
            src={PLC}
            alt="PLC"
            style={{ maxWidth: 500, minWidt: 400, width: "25vw" }}
          />

          <PLCIO />
        </FlexBox>
      </FormItem>
    </FormGroup>
  );
};

export default Home;
