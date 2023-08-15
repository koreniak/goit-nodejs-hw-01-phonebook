const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const allContacts = await listContacts();
        console.table(allContacts);
      } catch (error) {
        console.log(`Something went wrong: ${error.message}`);
      }
      break;

    case 'get':
      try {
        const contactById = await getContactById(id)
        console.table(contactById);
      } catch (error) {
        console.log(`Something went wrong: ${error.message}`);
      }
      break;

    case 'add':
      try {
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
      } catch (error) {
        console.log(`Something went wrong: ${error.message}`);
      }
      break;

    case 'remove':
      try {
        const removedContact = await removeContact(id);
        console.table(removedContact);
      } catch (error) {
        console.log(`Something went wrong: ${error.message}`);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);