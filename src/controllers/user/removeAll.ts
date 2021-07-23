import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';

export const removeUserSchema = Joi.object().keys({});

interface DeleteReqBody { }

const removeAll: RequestHandler = async (req: Request<{}, {}, DeleteReqBody>, res) => {
    const user = new User();
    const { deletedCount } = await user.model('User').deleteMany({});
    if (deletedCount !== 0) {
        res.send({
            success: true,
            message: 'Removed all users'
        });
    } else {
        res.send({
            success: false,
            message: 'Failed to find user to delete'
        });
    }
};

export default requestMiddleware(removeAll, { validation: { body: removeUserSchema } });