import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import pool from "@/utils/config";

import { createUserQuery, getPasswordQuery } from "@/utils/queries";
import { useRouter } from "next/navigation";
import cookies from "cookie-parser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const router = useRouter();
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const result = await pool.query(getPasswordQuery);

      const user = result.rows[0];

      if (!user) {
        res.status(401).json({ error: "Authentication failed" });

        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user.userId, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({ token });

        res.redirect(`/profile?token=${token} `);

        router.push({ pathname: "/profile", query: { token } });
      } else {
        res.status(401).json({ error: "Authentication failed" });
      }
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: "An error occurred during sign-in" });
    }
  } else if (req.method === "GET") {
    const { token } = req.query;

    //const token = req.cookies.token;

    if (!token) {
      router.push("/auth");
    } else {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({
          user: { userId: decodedToken.userId, email: decodedToken.email },
          contacts: [],
        });
      } catch (error) {
        console.error(error);

        res.status(401).json({ error: "Token verification failed" });
      }
    }
  } else if (req.method === "DELETE") {
    res.setHeader(
      "Set-Cookie",
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    res.status(200).json({ message: "Sign-out successful" });
  } else {
    res.status(405).json({ error: "Invalid Request Method" });
  }
}
