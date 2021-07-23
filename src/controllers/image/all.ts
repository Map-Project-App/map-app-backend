import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Image from '../../models/Image';

const all: RequestHandler = async (req, res) => {
  const images = await Image.find();
  res.send({ success: true, images });
};

export default requestMiddleware(all);
