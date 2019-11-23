// Dependencies
// ===========================================================
var express = require("express");
var app = express();
const path = require("path");
var PORT = process.env.PORT || 3000;

//set up teh express app to handle data parsing
app.use(express.urlencoded({ extend : true }));
app.use(express.json());


// Data
// ===========================================================
const reservation = [
    {
        customerName: 'Eric',
        customerEmail: 'eric@gmail.com',
        customerId: '123',
        phoneNumber: '970-593-2313',
    },
    {
        customerName: 'Kevin',
        customerEmail: 'kevin@aol.com',
        customerId: '145',
        phoneNumber: '970-456-1234',
    },
];

const waitlist = [
    {
        customerName: 'Katie',
        customerEmail: 'eric@gmail.com',
        customerId: '789',
        phoneNumber: '970-593-2313',
    },
    {
        customerName: 'Adam',
        customerEmail: 'kevin@aol.com',
        customerId: '047',
        phoneNumber: '970-456-1234',
    },
]




// Routes
// ===========================================================
// General route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, './public/main.html'));
  });

// Add route
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, './public/viewtables.html'));
  });

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, './public/reservation.html'));
  });

// Get all the data
app.get('/api/reservation', (req, res) =>{
    return res.json(reservation);
});

app.get('/api/waitlist', (req, res) =>{
    return res.json(waitlist);
});


// POST API
app.post('/api/tables', (req, res) =>{
    const newReservation = req.body;
    console.log(newReservation);
  
    // newReservation.routeName = newReservation.name.replace(/\s+/g,'').toLowerCase();
  
    // add new character to database
    if(reservation.length < 4){
        reservation.push(req.body);
        reservation.json(true);
    } else {
        waitlist.push(req.body);
        res.json(false);
    };
  
    // send back what I just added
   
}); 

app.post('api/clear'),(req, res) => {
    reservation.length = 0;
    waitlist.length = 0;
    res.json(true);
}


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });