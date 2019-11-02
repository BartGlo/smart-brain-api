const clarifai = require('clarifai')

const app = new clarifai.App({
  apiKey: '3b823bbd2b064c9ea9bd10679f91902d'
})

const handleApiCall = (req, res) => {
  app.models
    .predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => {
      if (
        response &&
        response.outputs[0] &&
        response.outputs[0].data &&
        response.outputs[0].data.regions[0] &&
        response.outputs[0].data.regions[0].region_info &&
        response.outputs[0].data.regions[0].region_info.bounding_box
      ) {
        res.send({
          status: 'success',
          coords: response.outputs[0].data.regions[0].region_info.bounding_box
        })
      } else {
        res.status(400).json('no face detected')
      }
    })
    .catch(e => {
      res.status(400).json(e)
    })
}

const handleImage = db => (req, res) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .returning('entries')
    .increment('entries', 1)
    .then(response => {
      if (response.length) {
        res.send(response[0])
      } else {
        res.status(404).send('not found')
      }
    })
    .catch(e => res.status(400).json(e))
}

module.exports = {
  handleImage,
  handleApiCall
}
