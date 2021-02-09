const { findUser } = require('../queries/userQueries');
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
            res.status(401).json({
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
               token = jwt.sign(session.handle, process.env.ACCESS_TOKEN_SECRET)
               res.status(200).json({token})
            }
         })
    } catch (error) {
       console.log(error.message)
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
};

module.exports = {
    createNewSession 
}