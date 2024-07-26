"use client";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const response = await axios
      .post("/api/auth", { email, password })
      .then((response) => response.json());

    if (response.ok) {
      setEmail("");

      setPassword("");

      router.push({
        pathname: `/profile?token=${response.data.token}`,
        query: { token: response.data.token },
      });
    } else {
      setError("Sign in failed");

      router.push("/");
    }
  };

  return (
    <div className="flex p-20 bg-gray-500">
      <form onSubmit={handleSignIn} className="m-10 bg-white space-y-4">
        <div className="relative z-0">
          <input
            type="text"
            id="email"
            name="email"
            className="inputform"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder=" "
          />

          <label htmlFor="email" className="labelform">
            Email
          </label>
        </div>

        <div className="relative z-0">
          <input
            type="text"
            id="password"
            name="password"
            className="inputform"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder=" "
          />

          <label htmlFor="password" className="labelform">
            Password
          </label>
        </div>

        <button type="submit" className="filledbutton w-full">
          {" "}
          SignIn{" "}
        </button>
      </form>

      <p className="my-2 mt-4 flex items-center justify-start">
        Don't have an account?{" "}
        <span onClick={() => router.push("/signup")}>sign up here</span>
      </p>
    </div>
  );
}
