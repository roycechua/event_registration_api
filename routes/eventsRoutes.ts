import { Router } from 'express';
import { addEvent, deleteEvent, fetchAllEvents, fetchEventById, updateEvent } from '../controllers/eventsControllers';

const router = Router();

router.get('', fetchAllEvents);
router.get(':id', fetchEventById);
router.post('', addEvent);
router.put('', updateEvent);
router.delete(':id', deleteEvent);

export default router;