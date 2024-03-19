// import express js
const express = require('express');

// create app
const app = express();

// middleware to convert object into json
app.use(express.json());

// Define arrays to store customer, room, and booking data
let customers = [
    {
        customerId: 'cust001',
        name: 'John Doe',
        phoneNumber: '123-456-7890',
        address: '123 Main St, City',
        idProof: 'A1234'
    },
    {
        customerId: 'cust002',
        name: 'Jane Smith',
        phoneNumber: '987-654-3210',
        address: '456 Elm St, Town',
        idProof: 'B5678'
    },
    {
        customerId: "cust003",
        customerName: "Bob Johnson",
        phoneNumber: "3456789012",
        address: "789 Oak Street, City, Country",
        idProof: "Driver's License"
      },
      {
        customerId: "cust004",
        customerName: "Emily Brown",
        phoneNumber: "5678901234",
        address: "321 Pine Street, City, Country",
        idProof: "Voter ID"
      },
      {
        customerId: "cust005",
        customerName: "Michael Davis",
        phoneNumber: "7890123456",
        address: "654 Cedar Street, City, Country",
        idProof: "PAN Card"
      }
];

let rooms = [
    {
        roomId: 'room001',
        amenities: ['WiFi', 'Projector', 'Whiteboard'],
        seatAvailability: 20,
        pricePerHour: 50,
        pricePerDay: 300,
        availability: true
    },
    {
        roomId: 'room002',
        amenities: ['WiFi', 'Coffee Machine'],
        seatAvailability: 10,
        pricePerHour: 40,
        pricePerDay: 250,
        availability: false
    },
    {
        roomId: "room003",
        amenities: ["WiFi", "Conference Phone", "Projector"],
        seatAvailability: 30,
        pricePerHour: 60,
        pricePerDay: 350,
        availability: false
      },
      {
        roomId: "room004",
        amenities: ["WiFi", "Computers", "Whiteboard"],
        seatAvailability: 25,
        pricePerHour: 70,
        pricePerDay: 400,
        availability: true
      },
      {
        roomId: "room005",
        amenities: ["WiFi", "Printer", "Scanner"],
        seatAvailability: 10,
        pricePerHour: 80,
        pricePerDay: 500,
        availability: true
      }
];

let bookings = [
    {
        customerName: 'John Doe',
        roomId: 'room001',
        bookedDate: '2024-02-10',
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        bookingStatus: 'Confirmed'
    },
    {
        customerName: 'Jane Smith',
        roomId: 'room002',
        bookedDate: '2024-02-12',
        startTime: '02:00 PM',
        endTime: '04:00 PM',
        bookingStatus: 'Confirmed'
    },
    
];

// define host and port 
// const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const apiDoc = "https://documenter.getpostman.com/view/19026522/2sA2xpTpsZ";

// get home page
app.get('/',(request,response) => {
    response.send('<h1>Hotel Booking</h1>' + 
    `<a href = "${apiDoc}" target = "_blank" >Api Documentation</a> for Hotel Booking.`);
});

// get all rooms
app.get('/room', (request,response) => {
    response.json(rooms);
});

// get all customers
app.get('/customer', (request,response) => {
    response.json(customers);
});

// get all Bookings
app.get('/booking', (request,response) => {
    response.json(bookings);
});

// get single room
app.get('/room/:id', (request,response) => {
    const id = request.params.id;
    const room = rooms.find( room => room.roomId == id);
    if(room){
        response.status(200).json(room);
    }else{
        response.status(404).json({message : "id not found"});
    }
})

// get single booking
app.get('/booking/:id', (request,response) => {
    const id = request.params.id;
    const booking = bookings.find( booking => booking.roomId == id);
    if(booking){
        response.status(200).json(booking);
    }else{
        response.status(404).json({message : "id not found"});
    }
})

// get single customer
app.get('/customer/:id', (request,response) => {
    const id = request.params.id;
    const customer = customers.find( customer => customer.customerId == id);
    if(customer){
        response.status(200).json(customer);
    }else{
        response.status(404).json({message : "id not found"});
    }
})

// create booking 
app.post('/addBooking', (request,response) => {
    bookings = bookings.concat(request.body);
    if(bookings){
        response.status(201).json({message : 'Booking Done Sucessfully'})
    }
})

// delete booking
app.delete('/deleteBooking/:id', (request,response) => {
    const id = request.params.id;
    // if id exist give note has response
    const booking = bookings.find( booking => booking.roomId == id);
    console.log(booking, "this is the deleted one");
    // delete note 
    bookings = bookings.filter( booking => booking.roomId == id);
    // send response 
    if(booking){
        response.status(200).json([{booking : booking},{message : "The above booking has deleted sucessfully"}]);
    }else{
        response.status(404).json({message : "id does not exist"});
    }
})

// update full booking data
app.put('/updateBooking/:id', (request,response) => {
    const id = request.params.id;
    // id exist
    const booking = bookings.find( booking => booking.roomId == id);
    console.log(booking, "this is the booking to be updated");
    // replace value
    const replaceBooking = request.body;
    // update note
    bookings = bookings.map( booking => booking.roomId == id ? replaceBooking : booking);
    // send response
    if(booking){
        response.status(200).json({message : "booking update sucessfully", data:replaceBooking});
    }else{
        response.status(404).json({message : "id does not exist"});
    }
})

// update single booking value
app.patch('/updateBooking/:id', (request,response) => {
    const id = request.params.id;
    // id exist
    const booking = bookings.find( booking => booking.roomId == id);
    // replace value
    const replaceBooking = request.body;
    // update note
    bookings = bookings.map( booking => booking.roomId == id ? {...booking,...replaceBooking} : booking);
    // send response
    if(booking){
        response.status(200).json({message : "booking update sucessfully"});
    }else{
        response.status(404).json({message : "id does not exist"});
    }
})

// server listener 
app.listen(PORT,() => {
    console.log(`server runnning at http://localhost:${PORT}`);
});



