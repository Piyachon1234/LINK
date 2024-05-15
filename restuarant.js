'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Restaurant schema
const RestaurantSchema = new Schema({
    restaurantName: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    priceRange: {
        type: Number
    },
    textDescription: {
        type: String
    },
    rating: {
        type: Number
    }
});

// Define Reservation schema
const ReservationSchema = new Schema({
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

// Define Menu schema
const MenuSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    itemName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Ordered', 'Prepared', 'Delivered']
    }
});

// Define Order schema
const OrderSchema = new Schema({
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    note: {
        type: String
    }
});

// Define PreOrder schema
const PreOrderSchema = new Schema({
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    note: {
        type: String
    }
});

// Define SummarizeMeal schema
const SummarizeMealSchema = new Schema({
    preOrderedItems: {
        type: [PreOrderSchema]
    },
    totalPrice: {
        type: Number
    }
});
// Define Table schema
const TableSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Free', 'Occupied', 'Alert', 'Reserved'],
        required: true
    },
    details: {
        type: String
    }
});

// Define FloorPlan schema
const FloorPlanSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    layout: {
        type: String // Could be a JSON string representing the layout
    },
    tables: [TableSchema]
});

// Create models
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Reservation = mongoose.model('Reservation', ReservationSchema);
const Menu = mongoose.model('Menu', MenuSchema);
const Order = mongoose.model('Order', OrderSchema);
const PreOrder = mongoose.model('PreOrder', PreOrderSchema);
const SummarizeMeal = mongoose.model('SummarizeMeal', SummarizeMealSchema);
const Table = mongoose.model('Table', TableSchema);
const FloorPlan = mongoose.model('FloorPlan', FloorPlanSchema);

module.exports = { Restaurant, Reservation, Menu, Order, PreOrder, SummarizeMeal };
