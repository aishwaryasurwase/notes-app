
const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {

    let notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title)

    // if (duplicateNotes.length == 0) {
    //     notes.push({
    //         title: title,
    //         body: body
    //     })
    //     saveNotes(notes);
    //     console.log(chalk.green.inverse("New note added!"));
    // } else {
    //     console.log(chalk.red.inverse("Note title taken!"));
    // }
    
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note title taken!"));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = JSON.parse(dataBuffer.toString());
        return data;
    } catch (err) {
        return [];
    }
}

const removeNote = (title) => {

    // const notes = loadNotes();
    // const index = notes.findIndex(note => note.title == title);

    // if (index > -1) {
    //     notes.splice(index, 1);
    //     let stringifyNotes = JSON.stringify(notes);
    //     fs.writeFileSync('notes.json', stringifyNotes);
    // } else {
    //     console.log("Title doesn't exist...");
    // }

    let notes = loadNotes();
    let updatedNotes = notes.filter((note) => note.title !== title);

    if (notes.length > updatedNotes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.green.inverse("Note removed!"));
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse("Title: ", note.title));
        console.log("Body: ", note.body);
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

const saveNotes = (notes) => {
    stringifyNotes = JSON.stringify(notes);
    fs.writeFileSync('notes.json', stringifyNotes)
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes'));
    notes.forEach(note => console.log(note.title));
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};