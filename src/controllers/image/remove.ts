import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Image from '../../models/Image';

export const removeImageSchema = Joi.object().keys({
  link: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});

interface DeleteReqBody {
  link: string;
  latitude: number;
  longitude: number;
}

const remove: RequestHandler = async (req: Request<{}, {}, DeleteReqBody>, res) => {
  const { link, latitude, longitude } = req.body;

  const image = new Image();
  const { deletedCount } = await image.model('Image').deleteOne({ link, latitude, longitude });
  if (deletedCount !== 0) {
    res.send({
      success: true,
      message: 'Removed image'
    });
  } else {
    res.send({
      success: false,
      message: 'Failed to find image to remove'
    });
  }
};

export default requestMiddleware(remove, { validation: { body: removeImageSchema } });
