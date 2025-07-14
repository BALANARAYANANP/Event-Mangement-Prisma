import { Request, Response } from 'express';
import DashboardServices from '../Services/AnallyticsServices';

export const GetAllEventAttendeeCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await DashboardServices.getAllEventAttendeeCounts();

    if (result.length > 0) {
      res.status(200).json({ 'All EventAttendeeCount': result });
    } else {
      res.status(404).json({ 'Oops': 'No EventAttendeeCount Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const popularVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await DashboardServices.getTopVenue();
    res.status(200).json({ 'Popular Venue': result });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};
