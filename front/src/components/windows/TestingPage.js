import React, { useState } from "react";
import Button from "../../dependencies/button/Button";
import InputField from "../../dependencies/InputFIeld/InputField";
import "./TestingPage.css";

function TestingPage() {
  const [state, setState] = useState({});

  const save = () => {
      console.log(state)
  }
  return (
    <div className="testing-div">
      <div className="form-block " style={{ width: "300px", height: "300px", border: "1px solid lime", opacity: "" }}>
        <InputField
          name="fname"
          value={state.fname}
          label="First name"
          placeholder="Full name"
          onChange={(e) =>
            setState((p) => ({ ...p, [e.target.name]: e.target.value }))
          }
        />
        {/* <InputField
          name="lname"
          value={state.lname}
          label="Last name"
          placeholder="Last name"
          onChange={(e) =>
            setState((p) => ({ ...p, [e.target.name]: e.target.value }))
          }
        /> */}
        {/* <Button label="Save" onClick={save} /> */}
      </div>
    </div>
  );
}

export default TestingPage;
