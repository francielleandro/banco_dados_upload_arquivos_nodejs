import Transaction from '../models/Transaction';
import Category from '../models/Category';
import { getCustomRepository, getRepository } from 'typeorm'; 
import TranactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

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

    const { total } = await transactionRepository.getBalance();

    if( type == 'outcome' && total < value){
      throw new AppError('You do not have enough balance');
    }

    let transactionCategory = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });

    if(!transactionCategory){

      transactionCategory = categoriesRepository.create({
        title:category
      });

      await categoriesRepository.save(transactionCategory);
    }

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
