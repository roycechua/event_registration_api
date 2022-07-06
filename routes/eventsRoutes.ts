import { Router } from 'express';
import { addEvent, deleteEvent, fetchAllEvents, fetchEventById, updateEvent, patchEventInfo } from '../controllers/eventsControllers';

const router = Router();

router.get('/', fetchAllEvents);
router.get('/:id', fetchEventById);
router.post('/', addEvent);
router.patch('/', patchEventInfo);
router.put('/', updateEvent);
router.delete('/:id', deleteEvent);

export default router;