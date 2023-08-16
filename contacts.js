const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, 'utf8');

  return JSON.parse(data);
};

function writeFile(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
};

async function listContacts() {
  const data = await readFile();

  return data;
};

async function getContactById(contactId) {
  const data = await readFile();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  };

  return data.find(contact => contact.id === contactId);
};

async function removeContact(contactId) {
  const data = await readFile();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  };

  const [result] = data.splice(index, 1);
  await writeFile(data);

  return result;
};

async function addContact(name, email, phone) {
  const data = await readFile();
  const newContact = {
    id: crypto.randomUUID().toString(),
    name,
    email,
    phone
  };

  data.push(newContact);
  await writeFile(data);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

