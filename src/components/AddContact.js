import React, { useState } from "react";
import PropTypes from 'prop-types';

{/*const AddContact = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
    });
    const handleAddContact = (e) => {
        setState((add) => ({
            ...state,
            name: e.target.value,
            email: e.target.value,
        }));
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (state.name === "" && state.email === "") {
            alert("All the field are mandatory!");
            return;
        }
        props.addContactHandler(state)
        console.log(state);
    };
    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={handleAdd}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={state.name} onChange={handleAddContact} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={state.email} onChange={handleAddContact} />
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
};
export default AddContact;*/}


class AddContact extends React.Component {
    state = {
        name: "",
        email: "",
    };
    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All the field are mandatory!");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({ name: "", email: "" });
        this.props.history.push("/");
    };
    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        );
    }
};
export default AddContact;