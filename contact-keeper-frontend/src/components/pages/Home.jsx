import React from "react";
import ContactForm from "../contacts/ContactForm";
import ContactsList from "../contacts/ContactsList";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactsList />
      </div>
    </div>
  );
};

export default Home;
