const { findUser, storeAuthToken } = require('../queries/userQueries');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createNewSession = async (req, res) => {

    const { session } = req.body;

    if (!session.handle || !session.password) {
        return res.status(400).send('Missing required fields: handle or password');
    }

    try {
        const dbUser = await findUser(session)

        if(dbUser == undefined){
            return res.status(401).json({
               error: "No user by that name"
            })
         }

        return bcrypt
         .compare(session.password, dbUser.password)
         .then(isAuthenticated => {
            if(!isAuthenticated){
               res.status(401).json({
                  error: "Unauthorized Access!"
               })
            }else{
               const payload = {handle: session.handle}
               const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                  algorithm: "HS256",
                  expiresIn: process.env.ACCESS_TOKEN_LIFE
              })
               const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                  algorithm: "HS256",
                  expiresIn: process.env.REFRESH_TOKEN_LIFE
              })
          
               storeAuthToken(session.handle, refreshToken)
              
               res.status(200).json({accessToken})
            }
         })
    } catch (error) {
        return res.status(500).json({status: "error:", message: 'Internal Server Error'})
    }
};

module.exports = {
    createNewSession 
}