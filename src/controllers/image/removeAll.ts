import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Image from '../../models/Image';

export const removeImageSchema = Joi.object().keys({});

interface DeleteReqBody {}

const removeAll: RequestHandler = async (req: Request<{}, {}, DeleteReqBody>, res) => {
  const image = new Image();
  const { deletedCount } = await image.model('Image').deleteMany({});
  if (deletedCount !== 0) {
    res.send({
      success: true,
      message: 'Removed all images'
    });
  } else {
    res.send({
      success: false,
      message: 'Failed to find image to delete'
    });
  }
};

export default requestMiddleware(removeAll, { validation: { body: removeImageSchema } });
