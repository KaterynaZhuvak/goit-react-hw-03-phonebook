import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter';

import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromStorage) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const newContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', newContacts);
    }
  }

  componentWillUnmount() {}

  handleAddContact = contact => {
    if (this.state.contacts.some(item => item.name === contact.name)) {
      alert('Contact already exists');
      return;
    }

    const newContact = {
      ...contact,
      id: nanoid(),
    };

    this.setState({ contacts: [...this.state.contacts, newContact] });
  };

  handleFilterChangeState = newFilter => {
    this.setState({ filter: newFilter });
  };

  filteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter handleFilterChangeState={this.handleFilterChangeState} />

        <ul>
          {this.filteredContacts().map(contact => (
            <ContactsList
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              handleDeleteContact={this.handleDeleteContact}
            />
          ))}
        </ul>
      </div>
    );
  }
}
