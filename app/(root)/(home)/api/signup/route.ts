import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import pool from "@/utils/config";

import { createUserQuery } from "@/utils/queries";

import cookies from "cookie-parser";

import { useRouter } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";

const secret = "your-secret-key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const router = useRouter();

    try {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const result = await pool.query(createUserQuery);

      const userId = result.rows[0].userId;

      const token = jwt.sign({ userId, email }, secret, { expiresIn: "1h" });

      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({ token });

      res.redirect(`/profile?token=${token} `);

      router.push({ pathname: "/profile", query: { token } });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: " sign-up error" });

      res.redirect("/");
    }
  } else {
    res.status(405).json({ error: "Invalid Request Method" });
  }
}
