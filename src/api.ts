import axios from "axios";

export async function doLogin(
  username: string,
  password: string
): Promise<unknown> {
  return await axios.post("/api/login", {
    username,
    password,
  });
}
