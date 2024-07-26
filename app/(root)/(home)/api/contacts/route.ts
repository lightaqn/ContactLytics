import pool from "@/utils/config";

import {
  addContactQuery,
  updateContactQuery,
  deleteContactQuery,
  getContactsQuery,
} from "@/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const result = await pool.query(getContactsQuery);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(200).json({ contacts: result.rows });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching contacts." });
    }
  } else if (req.method === "POST") {
    //adding contact to a user

    //const { contactId, userId } = req.query

    const {
      userId,
      firstName,
      lastName,
      email,
      gender,
      thumbnail,
      phoneNumber,
    } = req.body;

    try {
      const result = await pool.query(addContactQuery);

      res.json({ message: "Contact added to the database" });

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "error adding contact." });
    }
  } else if (req.method === "PUT") {
    //const { contactId, userId } = req.query

    const {
      contactId,
      userId,
      firstName,
      lastName,
      email,
      gender,
      thumbnail,
      phoneNumber,
    } = req.body;

    try {
      const result = await pool.query(updateContactQuery);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(result.rows[0]);

      res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "error updating the contact." });
    }
  } else if (req.method === "DELETE") {
    const { userId } = req.query;

    try {
      await pool.query(deleteContactQuery);

      res.json({ message: "Item deleted from the database" });
    } catch (error) {
      res.status(500).json({ error: "error deleting the contact." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
