// requiring node built in modules
var path = require('path');
// requiring third party node modules
var express = require('express');
var bodyParser = require('body-parser');

// invokes express function & assigns the return value to "app" variable
var app = express();

// app.use tells express/node that you are about to use middleware, which let's you modify requests when they come in
// urlencoded handles any requests that comes from form data and url from browser
// json handles any request that has a json body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservations = [{
  customerName: "Jeannie",
  customerEmail: "rose@example.com",
  customerID: "jeannie",
  phoneNumber: "000-000-0000"
}];

var waitList = [];


// Routes for displaying HTML pages
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
console.log(path.resolve(__dirname, './public/index.html'));
});

app.get('/tables', function (req, res) {
  res.sendFile(path.resolve(__dirname, './public/tables.html'));
});

app.get('/reserve', function (req, res) {
  res.sendFile(path.resolve(__dirname, './public/reserve-form.html'));
});

// API routes
// (five major routes: get, post, put, patch, delete)
app.get('/api/tables', function (req, res) {
  res.send(reservations);
});

app.get('/api/waitlist', function (req, res) {
  res.send(waitList);
});

// receives a request from a user, that request will be processed by the server
app.post('/api/reserve', function (req, res) {
  const {
    customerName,
    phoneNumber,
    customerEmail,
    customerID
  } = req.body;

  if (reservations.length >= 5) {
    waitingList.push({
      customerName,
      phoneNumber,
      customerEmail,
      customerID
    });
    res.send(false)
  } else {
    reservations.push({
      customerName,
      phoneNumber,
      customerEmail,
      customerID
    });
    res.send(true);
  }
});

app.listen(process.env.PORT ||  3000, function () {
  console.log('App listening on localhost:3000')
});