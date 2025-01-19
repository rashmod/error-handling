import express from 'express';

import { TodoController } from '@/todo/controller';
import { TodoRepository } from '@/todo/repository';
import { TodoService } from '@/todo/service';

const router = express.Router();

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);

export const todoRouter = router;
