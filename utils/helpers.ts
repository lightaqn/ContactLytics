import axios from "axios";

// Admin routes

// Fetch all contacts

const fetchContacts = async () => {
  const response = await axios.get("/api/contacts");

  const contacts = response.data;

  // Update your component state or render the contacts as needed
};

// Fetch a specific contact by ID

const fetchContactById = async (id) => {
  const response = await axios.get(`/api/contacts/${id}`);

  const contact = response.data;

  // Update your component state or display the contact details
};

// Edit a contact by ID

const editContact = async (id, newData) => {
  const response = await axios.put(`/api/contacts/${id}`, newData);

  // Handle success or error as needed
};
