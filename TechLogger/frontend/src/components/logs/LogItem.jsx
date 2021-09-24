import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const LogItem = (props) => {
  return (
    <li className="collection-jest">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger ${
            props.log.attention ? "red-text" : "blue-text"
          }`}
        >
          {props.log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID: #{props.log.id}</span> last updated
          by <span className="black-text">{props.log.tech}</span> on{" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{props.log.date}</Moment>
        </span>
        <a href="#!" className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default LogItem;
