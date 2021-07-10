import React, { useEffect, useState } from 'react';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import './App.css';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactDetail from './components/ContactDetail';
import api from "./api/contact";
import EditContact from './components/EditContact';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("./contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    }));
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    /* const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
     if (retriveContacts) setContacts(retriveContacts);*/
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={search.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={search}
                searchKeyWord={searchHandler}
              />
            )} />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />)} />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
        {/*<AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} />*/}
      </Router>
    </div>
  );
}

export default App;
