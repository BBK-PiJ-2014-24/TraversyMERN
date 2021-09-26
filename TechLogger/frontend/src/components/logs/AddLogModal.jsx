import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLog } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize";
import TechSelectOption from "../techs/TechSelectOption";

const AddLogModal = ({ addLog }) => {
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
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      // add Log via reducer
      addLog(newLog);

      // Raise a toast
      M.toast({ html: `Log Added by ${tech}` });

      // clear form
      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
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
              <TechSelectOption />
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

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

// State is not brought in via props, so MapStateToProps is not used and left as null
export default connect(null, { addLog })(AddLogModal);
