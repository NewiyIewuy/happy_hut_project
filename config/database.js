const crypto = require('crypto').randomBytes(256).toString('hex'); 


module.exports = {
  uri: process.env.MONGO_URL, 
  secret: crypto, 
  db: process.env.MONGO_NAME 
}
