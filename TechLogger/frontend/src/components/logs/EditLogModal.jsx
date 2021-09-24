import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize";

const EditLogModal = () => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const inputMessage = (e) => {
    setMessage(e.target.value);
  };

  const inputTech = (e) => {
    setTech(e.target.value);
  };

  const inputAttention = (e) => {
    setAttention(!attention);
  };

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please Enter Message and Technician" });
    } else {
      console.log("Submited", message, tech, attention);
      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={inputMessage}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              onChange={inputTech}
              className="browser-default"
            >
              <option value="" disabled>
                Select Technician
              </option>
              <option value="John Joe">John Doe</option>
              <option value="Sam Smith">Sam Smith</option>
              <option value="Sara Wilts">Sara Wilts</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  value={attention}
                  checked={attention}
                  onChange={inputAttention}
                />
                <span>Requires Attention</span>
              </label>
            </p>
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

const modalStyle = {
  width: "75%",
  height: "75%",
};

export default EditLogModal;
