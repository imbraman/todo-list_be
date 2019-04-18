var mongoose = require('mongoose');
var List = mongoose.model('List');

module.exports.create = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private method"
        });
    } else {
        var list = new List();
        list.listDay = req.body.listDay;
        list.lastModified = new Date();
        list.items = req.body.items;
        list.user = req.payload._id;
        list.save(function (err) {
            if (err) return console.log(err);
            res.status(200);
            res.json(list);
        });
    }
};

module.exports.update = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private method"
        });
    } else {
        List.findByIdAndUpdate(req.body.id, {
            items: req.body.items,
            lastModified: new Date()
        }, {new: true}, function (err, list) {
            if (err) return console.log(err);
            res.send(list);
        })
    }
};

module.exports.get = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private method"
        });
    } else {
        const listDay = req.query.listDay;
        List.findOne({user: req.payload._id, listDay: listDay}, function (err, list) {
            if (err) return console.log(err);
            res.send(list);
        });
    }
};
