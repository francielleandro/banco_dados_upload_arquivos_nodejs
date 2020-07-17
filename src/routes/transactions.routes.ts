import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find()

  const balance = await transactionsRepository.getBalance();

  response.json({transactions,balance});
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransactions = new CreateTransactionService();

  const transaction = await createTransactions.execute({
     title, 
     value, 
     type, 
     category
  });

  return response.json(transaction);
  
  // TODO
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactions = new DeleteTransactionService();

  await deleteTransactions.execute(id);

  return response.status(204).send();

});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
