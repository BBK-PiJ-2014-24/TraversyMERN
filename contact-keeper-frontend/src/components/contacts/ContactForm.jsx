import React, { useState, useContext, useEffect, useMemo } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = (props) => {
  const contactContext = useContext(ContactContext);

  const initialState = useMemo(() => {
    return {
      name: "",
      email: "",
      phone: "",
      type: "personal",
    };
  }, []);

  const [contact, setContact] = useState(initialState);

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (contactContext.currentContact !== null) {
      setContact(contactContext.currentContact);
    } else {
      setContact(initialState);
    }
  }, [contactContext, contactContext.currentContact, initialState]);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (contactContext.currentContact) {
      contactContext.updateContact(contact);
    } else {
      contactContext.addContact(contact);
    }
    setContact(initialState);
  };

  const clearAll = () => {
    contactContext.clearCurrentContact();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {contactContext.currentContact ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Contact Name"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Contact Email"
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Contact Phone"
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={
            contactContext.currentContact ? "Update Contact" : "Add Contact"
          }
          className="btn btn-primary btn-block"
        />
      </div>
      {contactContext.currentContact && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
