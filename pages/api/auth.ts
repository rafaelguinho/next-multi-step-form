import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', 'sesessiontoken=123; Secure; HttpOnly; SameSite=None; Path=/; Expires=Wed, 01 Feb 2023 13:20:26 GMT')

  return res.status(200).json({ name: "u" });
};
