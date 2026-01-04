import jwt from "jsonwebtoken";
function getToken (userId){
    return  jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
}

export default getToken;