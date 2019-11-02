const handleSignin = (db, bcrypt) => (req, res) => {
  const email = req.body.email,
    password = req.body.password

  db.select('email', 'hash')
    .from('login')
    .where({ email })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if (isValid) {
        return db
          .select()
          .from('users')
          .where({ email })
          .then(user => res.json({ status: 'signed', user: user[0] }))
      } else {
        return res.status(403).json({ error: 'Wrong credentials' })
      }
    })
    .catch(e => res.status(400).json({ error: e }))
}

module.exports = {
  handleSignin
}
