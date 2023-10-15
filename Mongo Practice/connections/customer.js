const mongoose = require ('mongoose');

const Url = 'mongodb+srv://raider72:umairraza1@cluster0.hinnfi8.mongodb.net/'

mongoose.connect(Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Customer Database connected"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection failed")); //to show error on the console if db doesnt run

module.exports = mongoose;