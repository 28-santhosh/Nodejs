const fs = require('fs');
const chalk = require('chalk');

const addNote = function(title, body){
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    });
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('\nNew Note Created!\n'));
    }
    else{
        console.log(chalk.bgRed("\nTitle already Taken!\n"));
    }
}

const removeNote = function(title){

    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.bgRed('No note found'));
    }

}

const listNotes = function(){
    const notes = loadNotes()
    
    console.log(chalk.keyword('black').bgBlue("\nYour Notes:\n"));

    notes.forEach((note) => {
        console.log(note.title )
    });
}

const readNote = function(title){
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(note.title + " : " + note.body);
    }
    else{
        console.log(chalk.keyword('black').bgRed("Note Not Found!"));
    }
}


const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

const saveNotes = function(notes)  {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}