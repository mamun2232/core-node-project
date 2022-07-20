// dependancies 
const {sampleHandeler} = require('./Hendelers/RouteHendelers/sampleHendelers')
const {userHandeler} = require('./Hendelers/RouteHendelers/userHandelers')
const {tokenHandeler} = require('./Hendelers/RouteHendelers/tokenHandelers')

const routes = {
      'sample': sampleHandeler,
      'user': userHandeler,
      'token': tokenHandeler,
}

module.exports = routes