// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import { getCustomRepository, getRepository } from 'typeorm'; 
import TranactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title:string;
  type:'income'|'outcome';
  value:number;
  category:'string';
}

class CreateTransactionService {
  public async execute({title, value, type, category}:Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TranactionRepository);
    const categoriesRepository = getRepository(Category);

    let transactionCategory = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });
    console.log(category);
    if(!transactionCategory){
      console.log(transactionCategory);
      transactionCategory = categoriesRepository.create({
        title:category
      });

      await categoriesRepository.save(transactionCategory);
    }

    console.log(transactionCategory);
    const transaction = transactionRepository.create({
      title, 
      value, 
      type,
      category:transactionCategory
    });
    
    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
