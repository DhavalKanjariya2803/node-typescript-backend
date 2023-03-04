import mongoose from 'mongoose';
import Users from '../model/Users';

interface User {
  name: string;
  email: string;
  contactNumber: string;
  bloodGroup: string;
  city: string;
  hobbies: string[];
  gender: string;
}

const uri = 'mongodb://localhost/usersDB';
//  data base connection
mongoose.connect(uri);


const seedUsers = async () => {
  const usersRawData = [
  ];

  // change this count with number of data requires
  let userRecordsCount = 100
  //  prepare dummy data
  for (let i = 0; i < userRecordsCount; i++) {
    usersRawData.push({
      name: `User ${i + 123}`,
      email: `user${i + 143}@example.com`,
      contactNumber: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"][Math.floor(Math.random() * 8)],
      city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"][Math.floor(Math.random() * 10)],
      hobbies: [["reading", "painting", "dancing", "cooking", "hiking", "swimming"][Math.floor(Math.random() * 6)]],
      gender: ["male", "female", "non-binary"][Math.floor(Math.random() * 3)],
    });
  }
  
  //  seed dummy data on database for testing purpose
  await Users.insertMany(usersRawData);
  console.log('Users seeded successfully!');

  //  data base connection
  mongoose.disconnect();
};
//  seeder error handeler
seedUsers().catch((error) => {
  console.error(error);
  mongoose.disconnect();
});