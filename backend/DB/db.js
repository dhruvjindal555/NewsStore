const mongoose = require('mongoose');
async function connectToDatabse() {
    let url = `mongodb+srv://dhruvjindal546:vjDHRJDh8R1xVg8S@cluster0.okba56z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(url).then(() => {
            console.log("Successfully Connected to Database")
        })
    } catch (e) {
        console.log("Error connecting to Database")
        console.log(e.message);
    }
}

module.exports = connectToDatabse

