'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Id: {
        type: String,
        required: 'Please enter id'
    },
    Name: {
        type: String,
        required: 'Please enter n'
    },
    gender: {
        type: String,
        required: 'Please enter d'
    },
    username: {
        type: String,
        required: 'Please enter p'
    },
    password: {
        type: String,
        required: 'Please enter s'
    },
    imgurl: {
        type: String,
        required: 'Please enter img'
    },
    userType: {
        type: String,
        enum: ['free', 'paid'],
        required: 'Please enter user type'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', function(next) {
    if (this.isModified('userType') && !this.isAdmin) {
        return next(new Error('Only admin can change the user type'));
    }
    next();
});

var LoginSchema = new Schema({
    username: {
        type: String,
        required: 'Please enter use'
    },
    email: {
        type: String,
        required: 'Please enter e'
    },
    password: {
        type: String,
        required: 'Please enter a password'
    }
});

var BookConfirmationSchema = new Schema({
    bookingID: {
        type: Number
    },
    noOfGuest: {
        type: Number
    },
    user: { // Reference to the User schema
        type: Schema.Types.ObjectId,
        ref: 'User' // This should match the model name of the User schema
    }
});
const ClientSchema = new Schema({
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'], // Example statuses
        required: true
    },
    netSale: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    netProfit: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    membership: {
        type: String,
        enum: ['paid', 'free'],
        required: true
    },
    recurringCustomers: {
        type: Number,
        required: true
    },
    totalCustomers: {
        type: Number,
        required: true
    },
    totalScanned: {
        type: Number,
        required: true
    }
});
const ReviewSchema = new Schema({
    reviewer: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Define Role schema
const RoleSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

// Define Member schema
const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
});

// Define Campaign schema
const CampaignSchema = new Schema({
    currentCampaign: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive', 'Completed'],
            required: true
        }
    },
    membership: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        required: true
    },
    reviews: [ReviewSchema],
    roles: [RoleSchema],
    members: [MemberSchema]
});

// Create models

module.exports = {
    User: mongoose.model('User', UserSchema, 'Items'),
    Login: mongoose.model('Login', LoginSchema, 'Logins'),
    BookConfirmation: mongoose.model('BookConfirmation', BookConfirmationSchema, 'BookConfirmations'),
    Client: mongoose.model('Client', ClientSchema),
    Campaign: mongoose.model('Campaign', CampaignSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Role: mongoose.model('Role', RoleSchema),
    Member: mongoose.model('Member', MemberSchema),
};
