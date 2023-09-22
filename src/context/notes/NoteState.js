import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  /*const state0 = {
    name: "yagnik",
    class: "10",
  };
  const [state, setstate] = useState(state0);

  const update = () => {
    setTimeout(() => {
      setstate({
        name: "nirali",
        class: "12",
      });
    }, 1000);
  };*/

  const demoNotes = [];
  const [notes, setNotes] = useState(demoNotes);
  const host = "http://localhost:5000";

  // Get a Note
  const getNote = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') 
      },
    });
    const res = await response.json();
    console.log(res);
    setNotes(res);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    console.log("Adding a new note");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // console.log(response)
    const note = await response.json()
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const res = await response.json();
    console.log(res);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNote, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
