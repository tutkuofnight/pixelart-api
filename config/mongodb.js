const mongoose = require("mongoose")

module.exports = () => {
  mongoose.connect(process.env.MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch(e => console.log('mongodb connection error: ' , e))
}