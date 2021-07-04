const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()

//Define paths for exoress xonfig
const pubDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pubDir))

// app.get('', (req,res)=>{
// res.send('<h1>HELlos</h1>')
// })

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: "Ashika"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: "Insert somehelpful text.",
        name: "Ashika"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: "Ashika"
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return  res.send({
            error:"You must provide an address!"
        })
    }
    geocode(req.query.address, (error, {latitude,longitude, location}={})=>{
       if(error){
        return  res.send({
            error
        })
       }
       forecast(latitude,longitude,(error, forecast)=>{
        if(error){
            return  res.send({
                error
            })
           }
           res.send({
            location,
            forecast
        })
       })
       

    })
    
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: "Ashika",
        errorMsg: 'Help article not found',
       
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return  res.send("You must provide a search term!")
    }
        res.send({
            products: []    
        })
    
       
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: "Ashika",
        errorMsg: 'Page not found.'   ,
        
    })
})



app.listen(3000, ()=>{
    console.log("Server's up!!")
})