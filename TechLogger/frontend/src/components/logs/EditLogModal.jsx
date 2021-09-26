import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize";
import { updateLog } from "../../actions/logActions";
import TechSelectOption from "../techs/TechSelectOption";

const EditLogModal = (props) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const { current, updateLog } = props;

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

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
      const submitLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date(),
      };

      updateLog(submitLog);
      M.toast({ html: `Updated Log by ${tech}` });

      // Clear Logs
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

const mapStateToProps = (state) => ({
  current: state.log.current,
});

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { updateLog })(EditLogModal);
