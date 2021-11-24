const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, description) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            description: description
        })
    
        saveNotes(notes)

        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title already exists.'))
    }

}

//remove Function
const removeNote = (title) => {
    const notes = loadNotes()

    const noteToRemove = notes.filter((note) => note.title === title)

    if(noteToRemove.length > 0){
        var i = 0;
        while(i < noteToRemove.length){
            const index = noteToRemove.indexOf(noteToRemove[i])
            notes.splice(index, 1)

        //increase variable 'i'
        i++

        }

        saveNotes(notes)
            
        //print a message that note has been deleted!
        console.log(chalk.green.inverse('Note has been removed!'))
    } else {
        console.log(chalk.red.inverse('No such note exists!'))
    }
}

//list notes
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue.inverse('Your notes'))
    for(i = 0; i < notes.length; i++){
        console.log(notes[i].title)
    }
}

//read a note
const readNote = (title) => {
    const notes = loadNotes()

    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead){
        console.log(chalk.green("Title: " + noteToRead.title))
        console.log("Description: " + noteToRead.description)
    }else {
        console.log("No such note exists")
    }
}

//save current notes
const saveNotes = (notes) => {
    const currentNotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', currentNotes)
}

const loadNotes = () => {
    try {
        const bufferData = fs.readFileSync('notes.json')
        const JSONnotes = bufferData.toString()
        return JSON.parse(JSONnotes)
    } catch (e) {
        return []
    }
}


module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}