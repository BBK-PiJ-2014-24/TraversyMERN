import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

function ContactFilter(props) {
  const contactContext = useContext(ContactContext);
  let textQuery = useRef("");

  useEffect(() => {
    if (contactContext.filteredContacts === null) {
      textQuery.current.value = "";
    }
  }, [contactContext.filteredContacts]);

  const onChange = (e) => {
    if (textQuery.current.value !== "") {
      contactContext.filter(e.target.value);
    } else {
      contactContext.clearFilterContacts();
    }
  };

  return (
    <form>
      <input
        ref={textQuery}
        type="text"
        placeHolder="Filter Contacts ..."
        onChange={onChange}
      />
    </form>
  );
}

export default ContactFilter;
