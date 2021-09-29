import { Router } from 'express';

import { EmployeeController } from './controllers/EmployeeController';

const router = Router();

const employeeController = new EmployeeController();

router.post('/employees', employeeController.create);
router.get('/employees/:id', employeeController.findById);
router.get('/employees', employeeController.findAll);
router.delete('/employees/:id', employeeController.delete);
router.put('/employees/:id', employeeController.update);

export { router };
