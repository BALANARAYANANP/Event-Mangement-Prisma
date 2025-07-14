import { Request, Response } from 'express';
import VenueService from '../Services/venueServices';
import { Venue } from '../dto/eventdto';

export const CreateVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Venue = req.body;
    if (!data) {
      res.status(400).json({ Error: 'No Data Provided' });
      return;
    }

    const newVenue = await VenueService.createVenue(data);
    res.status(201).json({ 'Venue Created': newVenue });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const GetAllVenue = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allVenues = await VenueService.getAllVenues();
    if (allVenues.length > 0) {
      res.status(200).json({ 'All Venues': allVenues });
    } else {
      res.status(404).json({ 'Oops': 'No Venues Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const UpdateVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Venue = req.body;
    const id = req.params.id;
    if (!data || !id) {
      res.status(400).json({ Error: 'Invalid Request' });
      return;
    }

    const updatedVenue = await VenueService.updateVenue(id, data);
    res.status(200).json({ 'Venue Updated': updatedVenue });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const DeleteVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedVenue = await VenueService.deleteVenue(id);
    res.status(200).json({ 'Venue Deleted': deletedVenue });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};
