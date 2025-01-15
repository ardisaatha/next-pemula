"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/", // Redirect here on success
    });

    if (!result?.ok) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <label>
        Username:
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
