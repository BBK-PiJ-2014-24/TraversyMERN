import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize";

const AddTechModal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const inputFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const inputLastName = (e) => {
    setLastName(e.target.value);
  };

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please Enter First and Last Name" });
    } else {
      console.log("Submited", firstName, lastName);
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>Enter Tech Name</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={inputFirstName}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={inputLastName}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect blue btn"
          onClick={onSubmit}
        >
          Enter
        </a>
      </div>
    </div>
  );
};

export default AddTechModal;
