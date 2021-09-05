import React, { Fragment, useContext } from "react";
import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const ContactsList = (props) => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((c) => (
        <ContactItem key={c.id} contact={c} />
      ))}
    </Fragment>
  );
};

export default ContactsList;
