import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';

export const addUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    picture: Joi.string()
});

interface AddReqBody {
    username: string;
    email: string;
    picture: string;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
    const { username, email, picture } = req.body;

    const user = new User({ username, email, picture });
    await user.save();

    res.send({
        message: 'Saved',
        user: user.toJSON()
    });
};

export default requestMiddleware(add, { validation: { body: addUserSchema } });