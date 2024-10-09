const express = require("express");
const router = express.Router();
const {getContact, getAllContacts, createContact, updateContact, deleteContact  } = require('../controllers/contactController')

router.route('/').get(getAllContacts);

router.route('/').post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;
