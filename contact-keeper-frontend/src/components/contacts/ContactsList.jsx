import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from '../layout/Spinner';
import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const ContactsList = (props) => {
  const contactContext = useContext(ContactContext);

  const { contacts, filteredContacts, getContacts, loading } = contactContext;

  useEffect(()=>{
    getContacts();
    //eslint-disable-next-line
  },[]);


  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <Fragment>
     {contacts !== null && !loading ? (
      <TransitionGroup>
        {filteredContacts !== null
          ? filteredContacts.map((c) => (
              <CSSTransition classNames="item" key={c._id} timeout={500}>
                <ContactItem contact={c} />
              </CSSTransition>
            ))
          : contacts.map((c) => (
              <CSSTransition classNames="item" key={c._id} timeout={500}>
                <ContactItem contact={c} />
              </CSSTransition>
            ))}
      </TransitionGroup>
     ) : 
     <Spinner /> 
     }
    </Fragment>
  );
};

export default ContactsList;
