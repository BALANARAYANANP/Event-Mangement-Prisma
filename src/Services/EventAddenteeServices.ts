

import { EventAttendee } from '../dto/eventdto';
import { prisma } from '../prisma';
import { v4 as uuidV4 } from 'uuid';

class EventAttendeeService {
  
  async createEventAttendee(data: EventAttendee) {
    return await prisma.eventAddentee.create({
      data: {
        id: uuidV4(),
        eventId: data.eventId,
        attenteeId: data.attendeeId,
      },
    });
  }

  
  async getAllEventAttendees() {
   return await prisma.eventAddentee.findMany({
  skip: 0,
  take: 2,
  include: {
    attentee: true,
    event: true
  }
});

  }
  async updateEventAttendee(id: string, data: EventAttendee) {
    return await prisma.eventAddentee.update({
      data: {
        eventId: data.eventId,
        attenteeId: data.attendeeId,
      },
      where: {
        id,
      },
    });
  }

  async deleteEventAttendee(id: string) {
    return await prisma.eventAddentee.delete({
      where: {
        id,
      },
    });
  }
}

export default new EventAttendeeService();
