//Implementing a Memo List

let notes = [
    {
        id:1,
        title: "Note 1",
        content: "My first is here"
    }
];

export const list = () => {
    return notes.map(({id, title}) => ({
        author,
        id, 
        title
    }));
};

//Implementing Memo Details

export const get = (id) => {
    console.log(notes);
    const note = notes.find((note) => note.id === id);
    
    if (!note) {
        throw new Error('Note not found');
    }

    return note;
};

//Implementing Note Creation

export const create = (title, content) => {
    const lastNote = notes[notes.length - 1];
    const lastId = lastNote ? lastNote.id : 0;
   
    const newNote = {
        id: lastId + 1,
        title,
        content
    };

    notes.push(newNote);
    return newNote;
}

//Implementing Memory Modification

export const update = (id, title, content) => {
    const index = notes.findIndex((note) => note.id === id);

    if (index < 0) {
        throw new Error('Note not found for update');
    }

    const note = notes[index];
    note.title = title;
    note.content = content;
    notes[index] = note;

    // notes[index] = {
    //     ...notes[index],
    //     title,
    //     content

    return note;
    };

// Implementing Memory Deletion
export const remove = (id) => {
    if (!notes.find(note => note.id === id)) {
        throw new Error('Note not found for delete');
    }
    
    notes = notes.filter(note => note.id !== id);
    return;
};

