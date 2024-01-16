const asyncHandler = require("express-async-handler");
const Contact = require("../../models/contactModel");

//@desc get all contacts
//@route GET /api/contacts

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts


const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { firstname, lastname, email, message } = req.body;
  if (!firstname || !lastname || !email || !message) {
    res.status(400);
    throw new Error(
      "All fields (firstname, lastname, email, message) are mandatory!"
    );
  }
  const contact = await Contact.create({
    firstname,
    lastname,
    email,
    message,
  });
  res.status(201).json(contact);
});

//@desc GET contact
//@route GET /api/contacts/:id


const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id


const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id


const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};
