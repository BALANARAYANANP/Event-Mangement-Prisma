

import { prisma } from '../prisma';

class DashBoardServices {

  async getAllEventAttendeeCounts() {
    const eventCounts = await prisma.event.findMany({
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

    return eventCounts.map(event => ({
      title: event.title,
      totalCount: event._count.EventAddentee,
    }));
  }


  async getTopVenue() {
    const venues = await prisma.venue.findMany({
      include: {
        Event: {
          include: {
            EventAddentee: true,
          },
        },
      },
    });

    const venueWithAttendance = venues.map(venue => {
      const totalAttendees = venue.Event.reduce((count, event) => {
        return count + event.EventAddentee.length;
      }, 0);

      return {
        id: venue.id,
        name: venue.name,
        totalAttendees,
      };
    });

    const [topVenue] = venueWithAttendance.sort(
      (a, b) => b.totalAttendees - a.totalAttendees
    );

    return topVenue ?? null;
  }

}
export default new DashBoardServices();
