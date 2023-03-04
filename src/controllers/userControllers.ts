import { RequestHandler } from "express";
import Users from "../model/Users";

//  get all users function
export const getUsers: RequestHandler = async (req, res, next) => {
  //  request params for pagination 
  const { page, limit } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 1000;

  try {
    const usersData = await Users.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({data: usersData, statusCode: 200, message: 'Data fetched successfully!'});
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//  get single user data function
export const getUserData: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
    try {

      const user = await Users.findById(id);
  
      // validtion  based on records available in database
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      return res.status(200).json({data: user, statusCode: 200, message: 'Data fetched successfully!'});
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

//  filter data for search text and bloodgroup
export const filterUser: RequestHandler  = async (req, res, next) => {
  const { searchText, bloodGroup } = req.body;
  try {
    const users = await Users.find({
      $or: [
        { name: { $regex: searchText as string, $options: 'i' } },
        { email: { $regex: searchText as string, $options: 'i' } },
      ],
      ...(bloodGroup ? { bloodGroup: bloodGroup as String } : {}),
    });
    return res.status(200).json({data: users, statusCode: 200, message: 'Data fetched successfully!'});
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}



