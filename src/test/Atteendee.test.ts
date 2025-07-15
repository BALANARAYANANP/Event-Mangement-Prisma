import { GetAllAttendee } from "../Controllers/AttendeesControllers";
import { prisma } from "../prisma";
import AttendeeServices from "../Services/AttendeeServices";
import {v4 as uuid} from 'uuid'


jest.mock('../prisma',() => ({

    prisma: {
        attendee: {
            findMany : jest.fn(),
            create: jest.fn()
        }
    }

}))

describe("getAllAttendees", ()=> {
    it("should return if User is Found", async()=> {
        const mockAttendees = [
            {id: "1223", name: "testing", email: "abc@gmail.com"},
            {id: "34fe4", name : "unit testing", email: "123@gmail.com"}
        ];
        (prisma.attendee.findMany as jest.Mock).mockResolvedValue(mockAttendees)

        const result = await AttendeeServices.getAllAttendees()
        

        expect(result).toEqual(mockAttendees)
        expect(prisma.attendee.findMany).toHaveBeenCalled();
    })

    it("it should return empty array when no attendees is Found", async()=>{
        (prisma.attendee.findMany as jest.Mock).mockResolvedValue([])

        const result = await AttendeeServices.getAllAttendees()

        expect(result).toEqual([])
    })
})



describe('CreateAttendee', () => {
    it('should create a new attendee', async () => {
      const mockInput = { name: "nova", email: "nova@gmail.com" };
      const mockcreatedAttendee = { id: uuid(), ...mockInput };
  
      (prisma.attendee.create as jest.Mock).mockResolvedValue(mockcreatedAttendee);
  
      const result = await AttendeeServices.createAttendee(mockInput);
  
      expect(prisma.attendee.create).toHaveBeenCalledWith({
        data: expect.objectContaining(mockInput),
      });
  
      expect(result).toEqual(mockcreatedAttendee);
    });
  
    it("should throw an error if prisma fails", async () => {
      const mockInput = { name: "bob", email: "bob@gmail.com" };
      (prisma.attendee.create as jest.Mock).mockRejectedValue(new Error('DB Error'));
  
      await expect(AttendeeServices.createAttendee(mockInput)).rejects.toThrow('DB Error');
    });
  });
  