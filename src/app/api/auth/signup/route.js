import { signUp } from "../../../auth/auth";

export async function POST(req, res) {
  return await signUp(req, res);
}
