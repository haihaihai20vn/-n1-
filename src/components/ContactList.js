import React, { useRef } from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

const ContactList = (props) => {
    const inputEl = useRef("");
    console.log(props);
    const deleteContact = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                clickHander={deleteContact}
                key={contact.id}
            />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyWord(inputEl.current.value);
    };
    return (
        <div className="main">
            <h2>
                Contact list
                <Link to="/add">
                    <button className="ui blue right floated button" >Add Contact</button>
                </Link>
            </h2>
            <div class="ui search">
                <div class="ui icon input">
                    <input
                        ref={inputEl}
                        className="prompt"
                        type="text"
                        placeholder="Search"
                        value={props.term}
                        onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list" >{renderContactList}</div>
        </div>
    );
};
export default ContactList;