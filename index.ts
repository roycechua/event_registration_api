const express = require("express");
const app = express();

/* 
middleware
request -> node server -> middleware -> function()
*/
// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// EVENT REGISTRATION API
type EventData = {
    id: string,
    title: string,
    date: string,
    loc: string,
    price: number
}

let events: EventData[] = [
    {id:"1", title: "event 1", date: "july 10, 2022", loc: "qc", price: 100},
    {id:"2", title: "event 2", date: "july 12, 2022", loc: "qc", price: 0},
    {id:"3", title: "event 3", date: "august 23, 2022", loc: "makati", price: 250},
    {id:"4", title: "event 4", date: "october 27, 2022", loc: "pasig", price: 300},
    {id:"5", title: "event 5", date: "december 30, 2022", loc: "marikina", price: 500},
];

app.get("/", (req, res) => {
    return res.send("Event Registration API");
});

// possible nouns: users, events, registrations, categories
app.get("/events", (req, res) => {
    const query: any = req.query;
    
    if(Object.keys(query).length === 0) { // if no query params
        return res.status(200).send({message: "Request successful", data: events});
    }

    // if query params were given
    let filtered_events: EventData[] = []
    // database operation
    if(query.title) {
        filtered_events = events.filter(event => query.title.toLowerCase() === event.title);
    }

    if(query.loc) {
        filtered_events = events.filter(event => query.loc.toLowerCase() === event.loc);
    }

    if(filtered_events.length > 0) {
        return res.status(200).send({message: "Request successful", data: filtered_events});
    } 

    return res.status(200).send({message: "Request successful", data: []});
});

app.get("/events/:id", (req, res) => {
    const params = req.params;
    const id = params.id;
    // database operation to query specific record
    const event = events.find((event) => id === event.id); // undefined if nothing found
    if(!event) {
        return res.status(200).send({message: "Request successful", data: []});
    }
    return res.status(200).send({message: "Request successful", data: event});
});

app.post("/events", (req, res) => {
    const body: EventData = req.body;
    if(!body.title) {
        res.status(422).send({message: "Missing title"});
    }
    // database operation to insert new record to db
    events = [...events, body];
    return res.status(201).send({message: "Event successfully added", data: body});
});

app.put("/events", (req, res) => {
    const body = req.body;
    const dataWithoutBody = events.filter((event) => body.id !== event.id); 
    events = [...dataWithoutBody, body];
    return res.status(200).send({message: "Event successfully updated"});
});

app.delete("/events/:id", (req, res) => {
    events
})

app.listen(3000)