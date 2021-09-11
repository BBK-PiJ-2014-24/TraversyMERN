import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const ContactsList = (props) => {
  const contactContext = useContext(ContactContext);

  const { contacts, filteredContacts } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filteredContacts !== null
          ? filteredContacts.map((c) => (
              <CSSTransition classNames="item" key={c.id} timeout={500}>
                <ContactItem contact={c} />
              </CSSTransition>
            ))
          : contacts.map((c) => (
              <CSSTransition classNames="item" key={c.id} timeout={500}>
                <ContactItem contact={c} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default ContactsList;
