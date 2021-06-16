import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Image from '../../models/Image';

/**
 * Need to find a way to gather all images within a certain area. As it stands this
 * function is exactly the same as all.ts.
 */

const area: RequestHandler = async (req, res) => {
    const images = await Image.find();
    res.send({ images });
};

export default requestMiddleware(area);