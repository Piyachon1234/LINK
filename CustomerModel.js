'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderPageSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Menu', // Assuming 'Menu' model holds the details of the menu items
        required: true
    },
    picture: {
        type: String, // URL or path to the picture
        required: true
    },
    menuName: {
        type: String,
        required: true
    },
    remark: {
        type: String
    }
});
const CustomerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
    },
    reservations: [CustomerReservationSchema]

})
// Define SummarizeMealPage schema
const SummarizeMealPageSchema = new Schema({
    items: [OrderPageSchema], // Array of OrderPageSchema
    totalPrice: {
        type: Number,
        required: true
    }
});
// Define CustomerReservation schema
const CustomerReservationSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    dateTime: {
        type: Date
    },
    reservedSeats: {
        type: Number
    },
    note: {
        type: String
    },
    preOrderedItems: {
        type: [String]
    },
    cancellation: {
        type: Boolean,
        default: false
    }
});

// Define PreOrderPage schema
const PreOrderPageSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    menuName: {
        type: String,
        required: true
    },
    remark: {
        type: String
    }
});

// Define Reservation schema for past and upcoming reservations
const ReservationSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    reservedSeats: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    preOrderedItems: [PreOrderPageSchema], // Array of PreOrderPageSchema
    cancellation: {
        type: Boolean,
        default: false
    }
});

// Define ReservationPage schema
const ReservationPageSchema = new Schema({
    pastReservations: [ReservationSchema],
    upcomingReservations: [ReservationSchema]
});

const Customer = mongoose.model('Customer', CustomerSchema);
const OrderPage = mongoose.model('OrderPage', OrderPageSchema);
const SummarizeMealPage = mongoose.model('SummarizeMealPage', SummarizeMealPageSchema);
const PreOrderPage = mongoose.model('PreOrderPage', PreOrderPageSchema);
const ReservationPage = mongoose.model('ReservationPage', ReservationPageSchema);

module.exports = { Customer, OrderPage, PreOrderPage, ReservationPage};
