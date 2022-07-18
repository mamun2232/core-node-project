
// modules scapHolding

const enverments = {}

enverments.staging = {
      port: 6000,
      envName: "staging"
}

enverments.producation = {
      port: 5000,
      envName: "producation"
}

// ditermind wach enverment was passed
const carrentEnverment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging'


//  export carresponding enverment object
const envermentToExport = typeof(enverments[carrentEnverment]) === "object" ? enverments[carrentEnverment] : enverments.staging

module.exports = envermentToExport