import "./App.css";
import React, { useState } from "react";
import contactsData from "./contacts.json";

function App() {
  const [currentContacts, setCurrentContacts] = useState(
    contactsData.slice(0, 5)
  );
  const [remainingContacts, setRemainingContacts] = useState(
    contactsData.slice(5)
  );

  const addRandomContact = () => {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];
      setCurrentContacts((prevContacts) => [randomContact, ...prevContacts]);
      setRemainingContacts((prevRemaining) =>
        prevRemaining.filter((contact) => contact.id !== randomContact.id)
      );
    } else {
      alert("No hay mas contactos disponibles.");
    }
  };

  const sortByName = () => {
    const sortedContacts = [...currentContacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCurrentContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...currentContacts].sort(
      (a, b) => b.popularity - a.popularity
    );
    setCurrentContacts(sortedContacts);
  };

  const deleteContact = (id) => {
    const updatedContacts = currentContacts.filter(
      (contact) => contact.id !== id
    );
    setCurrentContacts(updatedContacts);
  };

  return (
    <div>
      <button onClick={addRandomContact}>Añadir contacto randomt</button>
      <button onClick={sortByName}>Ordenar por nombre</button>
      <button onClick={sortByPopularity}>Ordenar por popularidad</button>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Popularidad</th>
            <th>Tiene algun Oscar</th>
            <th>Tiene algun Emmy</th>
            <th>Borrar contacto</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={`Foto de ${contact.name}`}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🌟" : ""}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
