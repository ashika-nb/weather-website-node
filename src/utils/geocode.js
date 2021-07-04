const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoaWthbWFwcGVyIiwiYSI6ImNrYzJ5ZWh1bTA3NmIycW10YjBzYXplcWEifQ.VhU0UjMketbvKhDh5cQ1Sg&limit=1'
    request({ url, json: true }, (err, {body}) => {
        debugger
        if (err) {
            callback('Unable to fetch data!', undefined)
        } else if(body.features.length === 0) {
            callback('locaion unclear! Enter location pweaase!', undefined)

        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            const data = { longitude, latitude ,location}
            callback(undefined, data)
        }
    })
}


module.exports = geocode