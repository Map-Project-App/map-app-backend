import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BookController from './controllers/book';
import * as ImageController from './controllers/image';
import * as UserController from './controllers/user';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Book routes
router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// Image routes
router.post('/image/add', ImageController.add);
router.get('/image/all', ImageController.all);
router.get('/image/area', ImageController.area);
router.delete('/image/remove', ImageController.remove);
router.delete('/image/removeAll', ImageController.removeAll);

// User routes
router.post('/user/add', UserController.add);
router.get('/user/all', UserController.all);
router.get('/user/search', UserController.search);
router.delete('/user/remove', UserController.remove);
router.delete('/user/removeAll', UserController.removeAll);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

  // Image dev
  router.delete('/dev/image/remove/all', ImageController.removeAll);
}

export default router;
