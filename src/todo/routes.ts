import express from 'express';

import asyncHandler from '@/lib/async-handler';
import { TodoController } from '@/todo/controller';
import { TodoRepository } from '@/todo/repository';
import { TodoService } from '@/todo/service';

const router = express.Router();

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.post('/', asyncHandler(todoController.createTodo));
router.get('/', asyncHandler(todoController.getTodos));

export const todoRouter = router;
