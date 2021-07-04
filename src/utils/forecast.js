const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=1621211e0c381d75403a66166668f0af&query='   + latitude + ',' +  longitude

   // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoaWthbWFwcGVyIiwiYSI6ImNrYzJ5ZWh1bTA3NmIycW10YjBzYXplcWEifQ.VhU0UjMketbvKhDh5cQ1Sg&limit=1'
    request({ url, json: true }, (err, {body}) => {
        //debugger
        if (err) {
            callback('Unable to fetch data!', undefined)
        } else if(body.error) {
            callback('locaion unclear! Enter location pweaase!', undefined)

        } else {
            // const longitude = res.body.features[0].center[0]
            // const latitude = res.body.features[0].center[1]
            // const location = res.body.features[0].place_name
            // const data = { longitude, latitude ,location}
            //console.log(response.body.current.weather_descriptions[0] + ". It  is currently " +response.body.current.temperature + " degrees out." )

            callback(undefined,body.current.weather_descriptions[0] + ". It  is currently " +body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees. And the humidity is " + body.current.humidity )
        }
    })
}


module.exports = forecast