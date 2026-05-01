import crypto from "crypto";

export default function handler(req, res) {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  const token = Math.random().toString(36).substring(2);
  const expire = Math.floor(Date.now() / 1000) + 60 * 5;

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  res.status(200).json({
    token,
    expire,
    signature,
    publicKey
  });
}
