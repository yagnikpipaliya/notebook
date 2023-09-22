import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          {/* <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i> */}
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note) }}></i>
          <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully!","success")}}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
