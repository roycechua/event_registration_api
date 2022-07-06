import { AppDataSource } from "../database/data-source";
import { Event } from "../database/entity/Event";
import { EventData } from "../models/events";

export const fetchAllEvents = async (req, res) => {
    const eventRepository = AppDataSource.getRepository(Event);
    const events = await eventRepository.find();
	return res.status(200).send({ message: 'Request successful', data: events });
}

export const fetchEventById = async (req, res) => {
	const params = req.params;
	const id = params.id;
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({id: id,})
	return res.status(200).send({ message: 'Request successful', data: event});
}

export const addEvent = async (req, res) => {
	const body: EventData = req.body;
    const newEvent = new Event()
    newEvent.title = body.title
    newEvent.date = body.date
    newEvent.loc = body.loc
    newEvent.price = body.price
    const eventRepository = AppDataSource.getRepository(Event);
    await eventRepository.save(newEvent)
	return res.status(201).send({ message: 'Event successfully added', data: newEvent });
}

export const patchEventInfo = async (req, res) => {
    const body = req.body;
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({id: body.id});
    await eventRepository.update(event, body);
    return res.status(200).send({ message: 'Event Info successfully patched'});
}

export const updateEvent = async (req, res) => {
	const body = req.body;
    const eventRepository = AppDataSource.getRepository(Event);
    await eventRepository.save(body) 
	return res.status(200).send({ message: 'Event successfully updated', data: body});
}

export const deleteEvent = async (req, res) => {
	const params = req.params;
	const id = params.id;
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({id: id});
    await eventRepository.remove(event);
	return res.status(200).send({ message: 'Event successfully deleted'});
}