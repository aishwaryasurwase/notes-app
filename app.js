const validator = require('validator');
const { argv } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes');

// Create a add note
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            type: "string",
            demandOption: true,
            describe: "Note title"
        },
        body: {
            type: 'string',
            demandOption: true,
            describe: 'Note body'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create a remove note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            demandOption: true,
            type: 'string',
            describe: 'Note title'
        }
    },
    handler(argv) {
        // console.log("Removing a note...")
        notes.removeNote(argv.title)
    }
})

// List a notes
yargs.command({
    command: 'list',
    describe: 'List out a notes',
    handler: () => {
        // console.log("list of notes...");
        notes.listNotes();
    }
})

// Read a note 
yargs.command({
    command: 'read',
    describe: "Read a note",
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Note title'
        }
    },
    handler() {
        notes.readNote(argv.title);
    }
})

yargs.parse();
