import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';

const buildUserSearchQuery = (username?: string, email?: string): { [key: string]: any } => {
    const query: any = {};
    if (username) {
        query.username = new RegExp(`.*${username}.*`, 'i');
    }
    if (email) {
        query.email = new RegExp(`.*${email}.*`, 'i');
    }

    return query;
}

interface SearchReqBody {
    username?: string;
    email?: string;
}

const search: RequestHandler = async (req: Request<{}, {}, {}, SearchReqBody>, res) => {
    const { username, email } = req.query;

    const query = buildUserSearchQuery(username, email);
    const users = await User.find(query);
    res.send({ users });
};

export default requestMiddleware(search);