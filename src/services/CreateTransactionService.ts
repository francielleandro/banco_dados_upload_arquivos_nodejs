// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm'; 
import TranactionRepository from '../repositories/TransactionsRepository';
import transaction from '../models/Transaction';

interface Request {
  title:string;
  type:'income'|'outcome';
  value:number;
  category:'string';
}

class CreateTransactionService {
  public async execute({title, value, type, category}:Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TranactionRepository);;

    const transaction = transactionRepository.create({
      title, 
      value, 
      type
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
