import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {

  // const oldContacts = [
  //   {
  //     id: 1,
  //     name: "Jill Johnson",
  //     email: "jill@gmail.com",
  //     phone: "111-111-1111",
  //     type: "personal",
  //     },
  //     {
  //       id: 2,
  //       name: "Sara Watson",
  //       email: "sara@gmail.com",
  //       phone: "222-222-2222",
  //       type: "personal",
  //     },
  //     {
  //       id: 3,
  //       name: "Harry White",
  //       email: "harry@gmail.com",
  //       phone: "333-333-3333",
  //       type: "professional",
  //     },
  //   ];

  const initialState = {
    contacts: null,
    currentContact: null,
    filteredContacts: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try{
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.respone.msg
      });
    }
  }

  // Add Contact
  const addContact = async (contact) => {
    // contact.id = uuidv4();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try{
      const res = await axios.post('/api/contacts', contact, config );
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.respone.msg
      });
    }

  };

  // Delete Contact
  const deleteContact = async (id) => {
    try{
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ 
          type: DELETE_CONTACT, 
          payload: id 
        });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.respone.msg
      });
    }
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try{
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config );
      console.log(res.data);
      dispatch({ type: UPDATE_CONTACT, payload: res.data.contact });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.respone.msg
      });
    }
  };

  // Clear Contacts
   const clearContacts = () => {
     dispatch({
       type: CLEAR_CONTACTS,
     });
   }

  // Set Current Contact
  const setCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filter = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilterContacts = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filteredContacts: state.filteredContacts,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        clearContacts,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filter,
        clearFilterContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
