import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Image from '../../models/Image';

export const addImageSchema = Joi.object().keys({
    link: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
});

interface AddReqBody {
    link: string;
    latitude: number;
    longitude: number;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
    const { link, latitude, longitude } = req.body;

    const image = new Image({ link, latitude, longitude });
    await image.save();

    res.send({
        message: 'Saved',
        book: image.toJSON()
    });
};

export default requestMiddleware(add, { validation: { body: addImageSchema } });
