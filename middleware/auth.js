module.exports = async (req , res , next) => {
  return req.user ? next() : res.json({message: 'Authentication error'})
}