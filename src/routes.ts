import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BookController from './controllers/book';
import * as ImageController from './controllers/image';

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
router.delete('/image/remove', ImageController.remove);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

  // Image dev
  router.delete('/dev/image/remove/all', ImageController.removeAll);
}

export default router;
