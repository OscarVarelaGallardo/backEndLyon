import jwt from "jsonwebtoken"

const generateJWT = (id) => {
    return jwt.sign({ name: "Lyon", id: "id" }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

export default generateJWT