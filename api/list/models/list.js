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
        _id:false,
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
