interface Query {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  thumbnail?: any;
  phoneNumber?: any;
}

export const addContactQuery = {
  text: `INSERT INTO contacts (userId, firstName, lastName, email, gender, thumbnail, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (userId) DO UPDATE SET firstName = $2, lastName = $3, email = $4, gender = $5, thumbnail = $6, phoneNumber = $6 WHERE contacts.userId = $1`,
  values: [userId, firstName, lastName, email, gender, thumbnail, phoneNumber],
};

export const updateContactQuery = {
  text: `UPDATE contacts SET firstName = $2, lastName = $3, email = $4, gender = $5, thumbnail = $6, phoneNumber = $6 WHERE userId = $1`,
  values: [userId, firstName, lastName, email, gender, thumbnail, phoneNumber],
};

export const deleteContactQuery = {
  text: `DELETE FROM contacts WHERE userId = $1`,

  values: [userId],
};

export const getContactsQuery = {
  text: `SELECT * FROM contacts WHERE userId = $1`,
  values: [userId],
};

export const createUserQuery = {
  text: "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING userId",
  values: [email, hashedPassword],
};

export const getPasswordQuery = {
  text: "SELECT userId, password FROM users WHERE email = $1",
  values: [email],
};
