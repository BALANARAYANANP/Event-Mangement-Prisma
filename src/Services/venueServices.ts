

import { Venue } from '../dto/eventdto';
import { prisma } from '../prisma';

class VenueService {

  async createVenue(data: Venue) {
    return await prisma.venue.create({
      data: {
        name: data.name,
        address: data.address,
        capacity: data.capacity,
      },
    });
  }


  async getAllVenues() {
    return await prisma.venue.findMany({include : {Event : true}});
  }


  async updateVenue(id: string, data: Venue) {
    return await prisma.venue.update({
      data: {
        name: data.name,
        address: data.address,
        capacity: data.capacity,
      },
      where: {
        id,
      },
    });
  }


  async deleteVenue(id: string) {
    return await prisma.venue.delete({
      where: {
        id,
      },
    });
  }
}

export default new VenueService(); 
