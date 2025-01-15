"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const data = useSession();

  if (!data) {
    return <p>Loading...</p>;
  }
  console.log(data);

  return (
    <div>
      {/* <h1>Welcome, {data.user?.email}!</h1> */}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
