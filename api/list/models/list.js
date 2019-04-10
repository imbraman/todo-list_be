var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({

    listDay: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        required: true
    },
    items: [{
        id: String,
        description: String
    }],
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


mongoose.model('List', listSchema);
