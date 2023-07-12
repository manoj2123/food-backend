import Jwt  from "jsonwebtoken";


export async function isAuthenticated(req,res,next){
    const token = req.headers["x-auth-token"];
    console.log("token---",token);
    if(!token){
        console.log("data")
        return res.status(400).json({data:"Invalid Authorization"})
    }
    Jwt.verify(token, process.env.SECERETKEY)
    // console.log("validuser--",validUser)
    next();
}