import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Image from '../../models/Image';

export const removeImageSchema = Joi.object().keys({
  link: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});

interface RemoveReqBody {
  link: string;
  latitude: number;
  longitude: number;
}

const remove: RequestHandler = async (req: Request<{}, {}, RemoveReqBody>, res) => {
  const { link, latitude, longitude } = req.body;

  const image = new Image({ link, latitude, longitude }); // ?
  await image.deleteOne();

  res.send({
    message: 'Removed',
    image: image.toJSON() // ?
  });
};

export default requestMiddleware(remove, { validation: { body: removeImageSchema } });
