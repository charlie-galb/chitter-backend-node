const { findUserByHandle, storeAuthToken } = require('../queries/userQueries');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createNewSession = async (req, res) => {

    const { handle, password } = req.body.session;

    if (!handle || !password) {
        return res.status(400).send('Missing required fields: handle or password');
    }

    try {
        const dbUser = await findUserByHandle(handle)

        if(dbUser == undefined){
            return res.status(401).json({
               error: "No user by that name"
            })
         }

        return bcrypt
         .compare(password, dbUser.password)
         .then(isAuthenticated => {
            if(!isAuthenticated){
               res.status(401).json({
                  error: "Unauthorized Access!"
               })
            }else{
               const payload = {handle: handle}
               const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                  algorithm: "HS256",
                  expiresIn: process.env.ACCESS_TOKEN_LIFE
              })
               const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                  algorithm: "HS256",
                  expiresIn: process.env.REFRESH_TOKEN_LIFE
              })
              
               storeAuthToken(handle, refreshToken)
               
               res.status(200)
                  .json({token: accessToken, user_id: dbUser.id})
            }
         })
    } catch (error) {
        return res.status(500).json({status: "error:", message: 'Internal Server Error'})
    }
};

module.exports = {
    createNewSession 
}