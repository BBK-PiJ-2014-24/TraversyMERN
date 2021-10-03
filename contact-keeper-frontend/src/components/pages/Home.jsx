import React, {useContext, useEffect} from "react";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import ContactsList from "../contacts/ContactsList";
import AuthContext from '../../context/auth/authContext';

const Home = () => {

  const authContext = useContext(AuthContext);
  
  useEffect(()=> {
    authContext.loadUser();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <ContactsList />
      </div>
    </div>
  );
};

export default Home;
