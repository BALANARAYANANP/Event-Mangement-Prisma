import { Request, Response } from 'express';
import AttendeeService from '../Services/AttendeeServices';
import { Attendee } from '../dto/eventdto';

export const CreateAttendee = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Attendee = req.body;
    if (!data) {
      res.status(400).json({ Error: 'No Data Provided' });
      return;
    }

    const newAttendee = await AttendeeService.createAttendee(data);
    res.status(201).json({ 'Attendee Created': newAttendee });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const GetAllAttendee = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allAttendees = await AttendeeService.getAllAttendees();
    if (allAttendees.length > 0) {
      res.status(200).json({ 'All Attendee': allAttendees });
    } else {
      res.status(404).json({ 'Oops': 'No Attendee Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const UpdateAttendee = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Attendee = req.body;
    const id = req.params.id;
    if (!data || !id) {
      res.status(400).json({ Error: 'Invalid Request' });
      return;
    }

    const updatedAttendee = await AttendeeService.updateAttendee(id, data);
    res.status(200).json({ 'Attendee Updated': updatedAttendee });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const DeleteAttendee = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedAttendee = await AttendeeService.deleteAttendee(id);
    res.status(200).json({ 'Attendee Deleted': deletedAttendee });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};
