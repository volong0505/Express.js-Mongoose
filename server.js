const  express = require('express'),
       cors = require('cors'),
       logger = require('morgan'), // logging middleware
       mongoose = require('mongoose')
       mainRoutes = require('./app/routes/person.router')

require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production';
const mongoUri = process.env.MONGO_URI

const app = express(); // => create global app object

app.use(cors());
app.use(express.urlencoded({ extended: true })); // => request object as a strings or arrays
app.use(express.json()); // => request object as a JSON Object
app.use(express.static('public'));
app.use(logger('dev'))


mongoose.connect(mongoUri).then(()=> {
    console.log('Mongoose Connected!');
}).catch((error) => {
    // console.log(error)
    console.error('Error connecting to database')
})

app.get('/', (req, res) => {
    res.json({ "message": "hello world"})
});

require('./app/routes/person.router')(app)

const server = app.listen(process.env.PORT || 3333, () => {
    console.log('Listening on port ' + server.address().port)
})

