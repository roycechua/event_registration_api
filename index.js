var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var express = require("express");
var app = express();
/*
middleware
request -> node server -> middleware -> function()
*/
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var events = [
    { id: "1", title: "event 1", date: "july 10, 2022", loc: "qc", price: 100 },
    { id: "2", title: "event 2", date: "july 12, 2022", loc: "qc", price: 0 },
    { id: "3", title: "event 3", date: "august 23, 2022", loc: "makati", price: 250 },
    { id: "4", title: "event 4", date: "october 27, 2022", loc: "pasig", price: 300 },
    { id: "5", title: "event 5", date: "december 30, 2022", loc: "marikina", price: 500 },
];
app.get("/", function (req, res) {
    return res.send("Event Registration API");
});
// possible nouns: users, events, registrations, categories
app.get("/events", function (req, res) {
    var query = req.query;
    if (Object.keys(query).length === 0) { // if no query params
        return res.status(200).send({ message: "Request successful", data: events });
    }
    // if query params were given
    var filtered_events = [];
    // database operation
    if (query.title) {
        filtered_events = events.filter(function (event) { return query.title.toLowerCase() === event.title; });
    }
    if (query.loc) {
        filtered_events = events.filter(function (event) { return query.loc.toLowerCase() === event.loc; });
    }
    if (filtered_events.length > 0) {
        return res.status(200).send({ message: "Request successful", data: filtered_events });
    }
    return res.status(200).send({ message: "Request successful", data: [] });
});
app.get("/events/:id", function (req, res) {
    var params = req.params;
    var id = params.id;
    // database operation to query specific record
    var event = events.find(function (event) { return id === event.id; }); // undefined if nothing found
    if (!event) {
        return res.status(200).send({ message: "Request successful", data: [] });
    }
    return res.status(200).send({ message: "Request successful", data: event });
});
app.post("/events", function (req, res) {
    var body = req.body;
    if (!body.title) {
        res.status(422).send({ message: "Missing title" });
    }
    // database operation to insert new record to db
    events = __spreadArray(__spreadArray([], events, true), [body], false);
    return res.status(201).send({ message: "Event successfully added", data: body });
});
app.put("/events", function (req, res) {
    var body = req.body;
    var dataWithoutBody = events.filter(function (event) { return body.id !== event.id; });
    events = __spreadArray(__spreadArray([], dataWithoutBody, true), [body], false);
    return res.status(200).send({ message: "Event successfully updated" });
});
app["delete"]("/events/:id", function (req, res) {
    events;
});
app.listen(3000);
