import express from "express";
import { AppDataSource } from "./database/data-source";
import eventsRoutes from "./routes/eventsRoutes";

const app = express();

AppDataSource.initialize()
.then(() => {})
.catch((error) => console.log(error))

/* 
middleware
request -> node server -> middleware -> function()
*/
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/events", eventsRoutes);

// EVENT REGISTRATION API
// let events: EventData[] = [
//     {id:"1", title: "event 1", date: "july 10, 2022", loc: "qc", price: 100},
//     {id:"2", title: "event 2", date: "july 12, 2022", loc: "qc", price: 0},
//     {id:"3", title: "event 3", date: "august 23, 2022", loc: "makati", price: 250},
//     {id:"4", title: "event 4", date: "october 27, 2022", loc: "pasig", price: 300},
//     {id:"5", title: "event 5", date: "december 30, 2022", loc: "marikina", price: 500},
// ];

app.get("/", (req, res) => {
    return res.send("Event Registration API");
});

// possible nouns/objects/entities: users, events, registrations, categories
// events
// users
// registrations

app.listen(3000)