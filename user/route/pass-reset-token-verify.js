function passResetTokenVerify(req, res, error) {
 try {
  return res.json({ st: true });
 } catch (error) {
  next(error);
 }
}

module.exports = passResetTokenVerify;
