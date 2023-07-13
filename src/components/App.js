import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from 'components/Form';
import Filter from 'components/Filter';
import ContactsList from 'components/ContactsList/ContactsList.js';
import { AppBox, Empty } from 'components/App.styled';
import { loadStorage, saveStorage } from '../LocalStorage/LocalStorage.js';

export default function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState(
    () => loadStorage(LOCAL_STORAGE_KEY) ?? []
  );


  componentDidMount = () => {
    const contacts = loadStorage(LOCAL_STORAGE_KEY);
    if (contacts) {
      this.setState({ contacts });
      return;
    }
    this.setState({ contacts: [] });
  };

  componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      saveStorage(LOCAL_STORAGE_KEY, nextContacts);
    }
  }

  addContact = (name, number) => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { id: nanoid(4), name, number }],
    }));
  };

  checkСontact = nameContact => {
    return this.state.contacts.some(
      ({ name: curentName }) => curentName === nameContact
    );
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  notifiesAlert = nameContact => {
    alert(`"${nameContact}" is already in contacts.`);
  };

  handleSubmit = ({ name: newName, number }) => {
    this.checkСontact(newName)
      ? this.notifiesAlert(newName)
      : this.addContact(newName, number);
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <AppBox>
        <h1>PhoneBook</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        {contacts !== undefined && contacts.length > 0 ? (
          <>
            <Filter onChange={this.handleChange} value={filter} />
            <ContactsList
              contacts={contacts}
              filter={filter}
              onDeleteContact={this.onDeleteContact}
            />
          </>
        ) : (
          <Empty>Contacts list is empty</Empty>
        )}
      </AppBox>
    );
  }
}