import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const Salt_Rounds = 10;
const JWT_SECRET = process.env.JWT_SECRET

export async function hashPassword(password) {

    return await bcrypt.hash(password, Salt_Rounds)

}

export function generate(user) {
   return jwt.sign(
    {id: user.id, email: user.email},
    JWT_SECRET,
    {expiresIn: '1h'}
)}
