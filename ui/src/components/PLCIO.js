import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { Button, Text } from "@ui5/webcomponents-react";

const PLCIO = ({ ID = 1, ReRender }) => {
  // Define your data for the table

  const { state } = useContext(Context);

  const [triggerUseEffect, setTriggerUseEffect] = useState(false);

  const [plcState, setPlcState] = useState({
    PLC_ID: "",
    IS_RUNNING: false,
    INPUT_CARD_ID: "",
    OUTPUT_CARD_ID: "",
    PROGRAM_ID: "",
    LINK_TO_INPUT_CARD: {},
    LINK_TO_OUTPUT_CARD: {},
    LINK_TO_PROGRAM: {},
  });

  useEffect(() => {
    const handleOnSuccess = (res) => {
      console.log(res);
      setPlcState(res.data);
    };

    const handleOnError = (err) => {
      console.log(err);
    };

    axios
      .get(
        `/ecommerce/PLC/${ID}?$expand=LINK_TO_INPUT_CARD,LINK_TO_OUTPUT_CARD,LINK_TO_PROGRAM`,
        {
          headers: {
            Authorization: state.Authorization,
          },
        }
      )
      .then(handleOnSuccess)
      .catch(handleOnError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUseEffect]);

  const cellStyle = {
    cursor: "pointer",
    border: "1px solid black",
    padding: "2px 0",
  };

  const handleUpdate = (bit, type) => {
    const handleOnSuccess = (res) => {
      setTriggerUseEffect((prev) => !prev);
    };

    const handleOnError = (err) => {
      console.log(err);
    };

    if (type === "I") {
      const cardId = plcState.OUTPUT_CARD_ID;
      const currentBitState = plcState.LINK_TO_INPUT_CARD["DIO_" + bit];
      const data = {};
      data["DIO_" + bit] = !currentBitState;

      axios
        .patch(`/ecommerce/Bit8CardInput/${cardId}`, data, {
          headers: {
            Authorization: state.Authorization,
          },
        })
        .then(handleOnSuccess)
        .catch(handleOnError);
    } else if (type === "O") {
      const cardId = plcState.OUTPUT_CARD_ID;
      const currentBitState = plcState.LINK_TO_OUTPUT_CARD["DIO_" + bit];
      const data = {};
      data["DIO_" + bit] = !currentBitState;

      axios
        .patch(`/ecommerce/Bit8CardOutput/${cardId}`, data, {
          headers: {
            Authorization: state.Authorization,
          },
        })
        .then(handleOnSuccess)
        .catch(handleOnError);
    }
  };

  const handleReset = () => {
    const handleOnSuccess = (res) => {
      console.log(res);
      setTriggerUseEffect((prev) => !prev);
    };

    const handleOnError = (err) => {
      console.log(err);
    };

    axios
      .post(
        `/ecommerce/reset`,
        {},
        {
          headers: {
            Authorization: state.Authorization,
          },
        }
      )
      .then(handleOnSuccess)
      .catch(handleOnError);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <Text>PLC Id: {plcState.PLC_ID}</Text>
      <Text>Program name: {plcState.LINK_TO_PROGRAM?.DESCRIPTION}</Text>
      <Text>Input card id: {plcState.INPUT_CARD_ID}</Text>
      <Text>Output card id: {plcState.OUTPUT_CARD_ID}</Text>
      <br />
      <div
        key="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          border: "1px solid black",
          padding: 10,
          textAlign: "center",
        }}
      >
        <div> Bit </div>
        <div> DI </div>
        <div> DO</div>

        <div>0</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_0
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(0, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_0 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_0
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(0, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_0 ? 1 : 0}{" "}
        </div>
        <div>1</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_1
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(1, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_1 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_1
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(1, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_1 ? 1 : 0}{" "}
        </div>
        <div>2</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_2
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(2, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_2 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_2
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(2, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_2 ? 1 : 0}{" "}
        </div>
        <div>3</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_3
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(3, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_3 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_3
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(3, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_3 ? 1 : 0}{" "}
        </div>
        <div>4</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_4
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(4, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_4 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_4
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(4, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_4 ? 1 : 0}{" "}
        </div>
        <div>5</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_5
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(5, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_5 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_5
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(5, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_5 ? 1 : 0}{" "}
        </div>
        <div>6</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_6
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(6, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_6 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_6
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(6, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_6 ? 1 : 0}{" "}
        </div>
        <div>7</div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_INPUT_CARD?.DIO_7
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(7, "I")}
        >
          {" "}
          {plcState.LINK_TO_INPUT_CARD?.DIO_7 ? 1 : 0}{" "}
        </div>
        <div
          style={{
            ...cellStyle,
            color: "white",
            backgroundColor: plcState.LINK_TO_OUTPUT_CARD?.DIO_7
              ? "green"
              : "red",
          }}
          onClick={(e) => handleUpdate(7, "O")}
        >
          {" "}
          {plcState.LINK_TO_OUTPUT_CARD?.DIO_7 ? 1 : 0}{" "}
        </div>
      </div>
      <Button onClick={handleReset}> RESET </Button>
    </div>
  );
};

export default PLCIO;
