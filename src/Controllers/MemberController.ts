import { Request, Response } from 'express';
import MemberService from '../Services/MemberServices';
import { Member, LoginMember } from '../dto/eventdto';

export const CreateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Member = req.body;
    if (!data) {
      res.status(400).json({ Error: 'No Data Provided' });
      return;
    }

    const newMember = await MemberService.createMember(data);
    res.status(201).json({ 'Member Created': newMember });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const GetAllMemberss = async (_req: Request, res: Response): Promise<void> => {
  try {
    const members = await MemberService.getAllMembers();
    if (members.length > 0) {
      res.status(200).json({ 'All Members': members });
    } else {
      res.status(404).json({ 'Oops': 'No Members Found' });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const UpdateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Member = req.body;
    const id = req.params.id;
    if (!data || !id) {
      res.status(400).json({ Error: 'Invalid Request' });
      return;
    }

    const updated = await MemberService.updateMember(id, data);
    res.status(200).json({ 'Member Updated': updated });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const DeleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await MemberService.deleteMember(id);
    res.status(200).json({ 'Member Deleted': deleted });
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};

export const LoginMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: LoginMember = req.body;
    if (!data.Username || !data.password) {
      res.status(400).json({ Error: 'Username and Password Required' });
      return;
    }

    const result = await MemberService.loginMember(data);

    if (result === null) {
      res.status(404).json({ Error: 'No Member Found' });
    } else if (result === 'INVALID_PASSWORD') {
      res.status(401).json({ Error: 'Invalid Password' });
    } else {
      res.status(200).json({ 'Login Successful': result });
    }
  } catch (err: any) {
    res.status(400).json({ Error: err.message });
  }
};
