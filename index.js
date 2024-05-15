'use strict';

const mongoose = require('mongoose');
const { Restaurant, Reservation, Menu, Order, PreOrder, SummarizeMeal } = require('./restaurant');
const { Customer } = require('./customer');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
async function createSampleData() {
    try {
        const restaurant = new Restaurant({
            restaurantName: 'Sample Restaurant',
            location: 'Sample Location',
            priceRange: 3,
            textDescription: 'A nice place to dine.',
            rating: 4.5
        });

        await restaurant.save();

        const customer = new Customer({
            username: 'johndoe',
            password: 'password123',
            name: 'John',
            lastName: 'Doe',
            reservations: [{
                restaurant: restaurant._id,
                dateTime: new Date(),
                reservedSeats: 4,
                note: 'Birthday celebration',
                preOrderedItems: ['Salad', 'Steak']
            }]
        });

        await customer.save();

        console.log('Sample data created successfully');
    } catch (error) {
        console.error('Error creating sample data:', error);
    }
}

createSampleData();
