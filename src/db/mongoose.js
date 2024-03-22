const mongoose = require('mongoose');

mongoose.connect(process.env.URI).then(() => console.log(`connected to database`))
.catch((err) => console.log(`failed to connect to database`))

module.exports = mongoose;