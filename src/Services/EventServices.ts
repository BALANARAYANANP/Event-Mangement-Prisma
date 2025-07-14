

import { event } from '../dto/eventdto';
import { prisma } from '../prisma';
import { v4 as uuidV4 } from 'uuid';

class EventService {
  async createEvent(data: event) {
    return await prisma.event.create({
      data: {
        id: uuidV4(),
        title: data.title,
        description: data.description,
        VenueId: data.VenueId,
        date: data.date,
      },
    });
  }

  async getAllEvents() {
    return await prisma.event.findMany({
      include: { EventAddentee: true },
    });
  }

  async getSingleEvent(id: string) {
    return await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            EventAddentee: true,
          },
        },
      },
    });
  }

  async updateEvent(id: string, data: event) {
    return await prisma.event.update({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
      },
      where: { id },
    });
  }

  async deleteEvent(id: string) {
    return await prisma.event.delete({
      where: { id },
    });
  }
}

export default new EventService(); 
