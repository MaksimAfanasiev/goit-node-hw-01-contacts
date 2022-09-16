const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readData() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function writeData(array) {
  const data = JSON.stringify(array, null, 2);
  await fs.writeFile(contactsPath, data);
}

async function listContacts() {
  const allContacts = await readData();

  return allContacts;
}

async function getContactById(contactId) {
  const allContacts = await readData();

  const id = contactId.toString();
  const oneContact = allContacts.find((contact) => contact.id === id);
  return oneContact || null;
}

async function removeContact(contactId) {
  const allContacts = await readData();

  const id = contactId.toString();
  const index = allContacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(index, 1);

  await writeData(allContacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const allContacts = await readData();

  const isNameExist = allContacts.find((contact) => contact.name === name);

  if (isNameExist) {
    return "This contact already exists";
  }

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);

  await writeData(allContacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
