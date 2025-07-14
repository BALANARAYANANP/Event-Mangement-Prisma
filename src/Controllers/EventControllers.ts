// controllers/EventController.ts

import { Request, Response } from 'express';
import EventService from '../Services/EventServices';
import { event } from '../dto/eventdto';

export const CreateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: event = req.body;
    if (!data) {
      res.status(400).json({ Error: 'No Data Provided' });
      return;
    }

    const newEvent = await EventService.createEvent(data);
    res.status(201).json({ 'Event Created': newEvent });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const GetAllEvent = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allEvents = await EventService.getAllEvents();
    if (allEvents.length > 0) {
      res.status(200).json({ 'All Events': allEvents });
    } else {
      res.status(404).json({ 'Oops': 'No Events Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const GetSingleEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const event = await EventService.getSingleEvent(id);
    if (event) {
      res.status(200).json({ Event: event });
    } else {
      res.status(404).json({ 'Oops': 'No Event Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const UpdateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: event = req.body;
    const id = req.params.id;
    if (!data || !id) {
      res.status(400).json({ Error: 'Invalid Request' });
      return;
    }

    const updatedEvent = await EventService.updateEvent(id, data);
    res.status(200).json({ 'Event Updated': updatedEvent });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const DeleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedEvent = await EventService.deleteEvent(id);
    res.status(200).json({ 'Event Deleted': deletedEvent });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};
