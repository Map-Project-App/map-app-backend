import { EmailOptions } from '@hapi/joi';
import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IUser extends ITimeStampedDocument {
    username: string;
    email: string;
    /** URL for profile picture */
    picture: string;
}

interface IUserModel extends Model<IUser> { }

const schema = new Schema<IUser>({
    username: { type: String, index: true, required: true },
    email: { type: String, index: true, required: true },
    picture: { type: String, index: true, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
