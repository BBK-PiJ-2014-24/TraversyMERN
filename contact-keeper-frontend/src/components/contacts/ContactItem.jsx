import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = (props) => {
  const contactContext = useContext(ContactContext);

  const { id, name, email, phone, type } = props.contact;

  const onDelete = () => {
    contactContext.deleteContact(id);
    contactContext.clearCurrentContact();
  };

  const onSelectCurrentContact = () => {
    contactContext.setCurrentContact(props.contact);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <button className="btn btn-dark btn-sm" onClick={onSelectCurrentContact}>
        Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;