function setAuthCookie(res, token) {
  res.cookie('tokenJWT', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 86400000    
  });
}

module.exports = { setAuthCookie };
