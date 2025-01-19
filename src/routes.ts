import express from 'express';

import { todoRouter } from '@/todo/routes';

const router = express.Router();

router.use('/todo', todoRouter);

export const routes = router;
