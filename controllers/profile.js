const handleProfileGet = db => (req, res) => {
  const { id } = req.params
  db.select()
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.send(user[0])
      } else {
        res.status(404).json('Not found')
      }
    })
    .catch(e => res.status(400).json(e))
}

module.exports = {
  handleProfileGet
}
