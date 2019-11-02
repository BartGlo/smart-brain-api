const handleRegister = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body
  if (name && email && password) {
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
      trx
        .insert({
          hash,
          email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return db('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name,
              joined: new Date()
            })
            .then(user => res.json({ status: 'created', user: user[0] }))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(e => res.status(400).json('unable to register'))
  } else {
    res.status(400).json('unable to register, data is missing')
  }
}

module.exports = {
  handleRegister
}
