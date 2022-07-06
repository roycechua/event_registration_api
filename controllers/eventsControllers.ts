import { EventData } from "../models/events";

export const fetchAllEvents = (req, res) => {

	return res.status(200).send({ message: 'Request successful' });
}

export const fetchEventById = (req, res) => {
	const params = req.params;
	const id = params.id;
	return res.status(200).send({ message: 'Request successful' });
}

export const addEvent = (req, res) => {
	const body: EventData = req.body;
	return res.status(201).send({ message: 'Event successfully added' });
}

export const updateEvent = (req, res) => {
	const body = req.body;
	return res.status(200).send({ message: 'Event successfully updated' });
}

export const deleteEvent = (req, res) => {
	const params = req.params;
	const id = params.id;
	return res.status(200).send({ message: 'Event successfully updated' });
}