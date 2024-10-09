const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const redisClient = require("../cache/redisClient");

const enableCaching = true;

// @desc Get all contacts
// @route GET /api/contacts
// @access public

const getAllContacts = asyncHandler(async (req, res) => {
  try {
    // Check if the data is already cached in Redis
    const cachedContacts = await redisClient.get("allContacts");

    if (cachedContacts) {
      // If data is found in Redis, return it
      return res.status(200).json(JSON.parse(cachedContacts));
    }

    // If data is not found in Redis, query the database
    const contacts = await Contact.find();

    // Store the result in Redis for future requests (with an expiration time, e.g., 1 hour)
    await redisClient.setEx("allContacts", 5, JSON.stringify(contacts));

    // Return the data from the database
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Create New contact
// @route POST /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
  console.log("Request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts
// @access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("contas", contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public

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

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json({ message: "Contact deleted successfully", contact });
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
