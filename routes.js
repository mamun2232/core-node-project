// dependancies 
const {sampleHandeler} = require('./Hendelers/RouteHendelers/sampleHendelers')
const {userHandeler} = require('./Hendelers/RouteHendelers/userHandelers')

const routes = {
      'sample': sampleHandeler,
      'user': userHandeler
}

module.exports = routes