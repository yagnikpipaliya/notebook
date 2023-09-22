const express = require("express");
const router = express.Router("express");
const Note = require("../models/notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const notes = require("../models/notes");

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route 1: Create a User using: POST "/api/auth/". Doesn't require Auth
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// Update Note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //Create newNote Object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // FInd the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
  res.json({note})
});

// Delete Note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  // FInd the note to be delete and deleted it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note=await Note.findByIdAndDelete(req.params.id)
  res.json({"msg":"Successfully Deleted note",note:note})
});

module.exports = router;
