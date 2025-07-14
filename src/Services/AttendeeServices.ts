
import { Attendee } from '../dto/eventdto';
import { prisma } from '../prisma';
import { v4 as uuidV4 } from 'uuid';

class AttendeeService {
  
  async createAttendee(data: Attendee) {
    return await prisma.attendee.create({
      data: {
        id: uuidV4(),
        name: data.name,
        email: data.email,
      },
    });
  }


  async getAllAttendees() {
    return await prisma.attendee.findMany({
      include: { EventAddentee: true },
    });
  }

  
  async updateAttendee(id: string, data: Attendee) {
    return await prisma.attendee.update({
      data: {
        name: data.name,
        email: data.email,
      },
      where: {
        id,
      },
    });
  }


  async deleteAttendee(id: string) {
    return await prisma.attendee.delete({
      where: {
        id,
      },
    });
  }
}

export default new AttendeeService();
