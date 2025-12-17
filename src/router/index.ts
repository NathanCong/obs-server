import Router from '@koa/router';
import OBSController from '@/controllers/OBSController';

const router = new Router();

// get 请求

// post 请求
router.post('/resource/upload', OBSController.upload);

export default router;
