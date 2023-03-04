import mongoose, { Schema, Document } from 'mongoose';

export interface Users extends Document {
  name: string;
  email: string;
  contactNumber: string;
  bloodGroup: string;
  city: string;
  hobbies: string[];
  gender: string;
}

//  user schema validation for fields 
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  hobbies: [{ type: String }],
  gender: { type: String, required: true },
});

export default mongoose.model<Users>('Users', UserSchema);