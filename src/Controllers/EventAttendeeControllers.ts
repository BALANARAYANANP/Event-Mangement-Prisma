import { Request, Response } from 'express';
import EventAttendeeService from '../Services/EventAddenteeServices';
import { EventAttendee } from '../dto/eventdto';

export const CreateEventAttendee = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: EventAttendee = req.body;
    if (!data) {
      res.status(400).json({ Error: 'No Data Provided' });
      return;
    }

    const newRecord = await EventAttendeeService.createEventAttendee(data);
    res.status(201).json({ 'Event Attendee Created': newRecord });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const GetAllEventAttendee = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allRecords = await EventAttendeeService.getAllEventAttendees();
    if (allRecords.length > 0) {
      res.status(200).json({ 'All EventAttendee': allRecords });
    } else {
      res.status(404).json({ 'Oops': 'No EventAttendee Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const UpdateEventAttendee = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data: EventAttendee = req.body;
    if (!data || !id) {
      res.status(400).json({ Error: 'Invalid Request' });
      return;
    }

    const updated = await EventAttendeeService.updateEventAttendee(id, data);
    res.status(200).json({ 'EventAttendee Updated': updated });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const DeleteEventAttendee = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await EventAttendeeService.deleteEventAttendee(id);
    res.status(200).json({ 'EventAttendee Deleted': deleted });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};
