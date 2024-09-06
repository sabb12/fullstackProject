import { createUser } from "../api";
import { useState } from "react";

export function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {}

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder={"Name"} />
      <input placeholder={"Email"} />
      <input placeholder={"Password"} />
    </form>
  );
}
