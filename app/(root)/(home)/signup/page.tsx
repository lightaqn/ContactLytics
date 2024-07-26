"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords do not match");

      setError("unmatched passwords");
    } else {
      const response = await axios
        .post("/api/signup", { email, password })
        .then((response) => response);

      if (response.status) {
        setEmail("");

        setPassword("");

        router.push("/profile");
      } else {
        setError("signIn failed");

        router.push("/");
      }
    }
  };

  return (
    <div className="flex p-20 w-screen h-screen bg-gray-500 items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col m-10 py-20 px-6 gap-y-6 rounded-2xl h-[50vh] w-full bg-white space-y-4"
      >
        <h1 className="flex text-center text-4xl items-center justify-center">
          Register
        </h1>
        <div className="relative z-0 mb-10">
          <input
            type="text"
            id="email"
            name="email"
            className="inputform text-2xl h-16"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="email" className="labelform">
            Email
          </label>
        </div>

        <div className="relative z-0 mb-10">
          <input
            type="text"
            id="password"
            name="password"
            className="inputform text-2xl h-16"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="password" className="labelform">
            Password
          </label>
        </div>

        <div className="relative z-0 mb-10">
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            className="inputform text-2xl h-16"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="confirmPassword" className="labelform">
            Confirm Password
          </label>
        </div>
        {error.length ? (
          <p className=" my-2 text-sm text-red-500">
            {error === "unmatched passwords"
              ? "passwords do not match"
              : "invalid credentials"}{" "}
          </p>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className="my-10 mt-20 text-2xl filledbutton w-full h-16"
        >
          {" "}
          SignUp{" "}
        </button>
        <p className="my-2 mt-10 text-lg flex items-center justify-start">
          Already have an account?{" "}
          <span onClick={() => router.push("/auth")}>sign in here</span>
        </p>
      </form>
    </div>
  );
}
