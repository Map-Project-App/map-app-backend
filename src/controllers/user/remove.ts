import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';

export const removeUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    picture: Joi.string()
});

interface RemoveReqBody {
    username: string;
    email: string;
    picture: string;
}

const remove: RequestHandler = async (req: Request<{}, {}, RemoveReqBody>, res) => {
    const { username, email, picture } = req.body;

    const user = new User();
    const { deletedCount } = await user.model('User').deleteOne({ username, email, picture });
    if (deletedCount !== 0) {
        res.send({
            success: true,
            message: 'Removed user'
        });
    } else {
        res.send({
            success: false,
            message: 'Failed to find user to remove'
        });
    }
};

export default requestMiddleware(remove, { validation: { body: removeUserSchema } });