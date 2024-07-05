const User = require('../Modals/UserSchema');
const validator = require('validator')
const bcrypt = require('bcrypt')
const saltRounds = 10;
async function signup(req, res) {
    try {
        const { email, password } = req.body
        if (validator.isEmail(email)) {
            const oldUser = await User.findOne({ email: email })
            if (oldUser) {
                return res.json({
                    "success": false,
                    "message": "User already exists"
                })
            } else {
                const user = new User()
                user.email = email

                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);
                user.password = hash
                await user.save()
                return res.json({
                    "success": true,
                    "message": "Successfully signed up"
                })
            }
        } else {
            return res.json({
                "success": false,
                "message": "Invalid Email"
            })
        }
    } catch (err) {
        console.log("An error occurred while signing up: " + err.message);
        return res.status(400).send(err)
    }


}

module.exports = signup