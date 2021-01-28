const path = require('path')
const express = require('express')
const cors = require('cors');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express confi
const publicStaticDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hamdlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicStaticDir))

// Allow cors
app.use(cors());
app.options('*', cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Steve'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Steve'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Steve',
        message: 'Help page'
    })
})

app.get('/dummy', (req, res) => {
    res.send({
        title: 'Tereny inwestycyjne w pobliżu wipasz s.a., dr. gerard 3.3 ha...',
        label: 'Dzierżawa',
        location: 'mazowieckie, Warszawa',
        area: 100000,
        price: 80000,
        image: 'http://domainfordev.org/tereny-banner/images/image.png'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'No address provided.'
        })
    }

    geocode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search required'
        })  
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-help', {
        title: '404',
        message: 'help article not found',
        name: 'Steve'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Steve'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})