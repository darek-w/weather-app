
const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFyaXVzenciLCJhIjoiY2tidHB6cm5hMGNjMzJzc3czNDI0MHBzaSJ9.hPFg1Dxd_By7IstpiFTceg&language=pl&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connet co location services')
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location')
        } else{
            callback(undefined, {
                location: body.features[0].place_name,
                lat: body.features[0].center[1],
                long: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode