import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IImage extends ITimeStampedDocument {
  /** Imgur link to image */
  link: string;
  /** Latitude coordinate of the image */
  latitude: number;
  /** Longitude coordinate of the image */
  longitude: number;
}

interface IImageModel extends Model<IImage> { }

const schema = new Schema<IImage>({
  link: { type: String, index: true, required: true },
  latitude: { type: String, index: true, required: true },
  longitude: { type: String, index: true, required: true }
});

schema.plugin(TimeStampPlugin);

const Image: IImageModel = model<IImage, IImageModel>('Image', schema);

export default Image;
