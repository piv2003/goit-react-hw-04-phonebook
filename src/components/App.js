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
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveStorage(LOCAL_STORAGE_KEY, contacts);
  }, [contacts]);

  function addContact(name, number) {
    setContacts(prevState => [...prevState, { id: nanoid(4), name, number }]);
  }

  function checkСontact(nameContact) {
    return contacts.some(contact => contact.name === nameContact);
  }

  function onDeleteContact(contactId) {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  }

  function notifiesAlert(nameContact) {
    return alert(`${nameContact} is already in contacts.`);
  }

  function handleSubmit(name, number) {
    checkСontact(name) ? notifiesAlert(name) : addContact(name, number);
  }

  return (
    <AppBox>
      <h1>PhoneBook</h1>
      <Form onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      {contacts !== undefined && contacts.length > 0 ? (
        <>
          <Filter setFilter={setFilter} filter={filter} />
          <ContactsList
            contacts={contacts}
            filter={filter}
            onDeleteContact={onDeleteContact}
          />
        </>
      ) : (
        <Empty>Contacts list is empty</Empty>
      )}
    </AppBox>
  );
}
