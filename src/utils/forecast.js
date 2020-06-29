const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6cb7d435e1781db5c08a7b13ed0825d9&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server.')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            callback(undefined, 'temperatura: ' + body.current.temperature + ' stopni. Prędkość wiatru: ' + body.current.wind_speed + 'km/h.')
        }
    })
}

module.exports = forecast