const User = require('../Modals/UserSchema');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
async function login(req, res) {
    try {
        const { email, password } = req.body
        if (validator.isEmail(email)) {
            const user = await User.findOne({ email: email })
            if (user) {
                if(bcrypt.compareSync(password, user.password)){
                    const data = {
                        user:{
                            id:user._id
                        }
                    }
                    var token = jwt.sign(data, SECRET_KEY);
                    console.log(user);
                    return res.json({
                        "success": true,
                        "message": "Successfully logged in with email",
                        "authToken" : token
                    })
                }else{
                    return res.json({
                        "success": false,
                        "message": "Incorrect Credentials"
                    })
                }
            } else {
                return res.json({
                    "success": false,
                    "message": "User does not exist"
                })
            }
        } else {
            return res.json({
                "success": false,
                "message": "Invalid Email"
            })
        }
    } catch (err) {
        console.log("An error occurred while logging in: " + err.message);
        return res.status(400).send(err)
    }


}


module.exports = login