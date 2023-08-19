const express = require('express');
const bodyParser = require('body-parser');


const api = require('./routes/api');
// const client = require('./clientConnection');

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.listen(3000, () => {
    console.log('listen 3000')
})
app.get('/', (req, res) => {
    res.status(200).json('hi ti is')
})




