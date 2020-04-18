import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!(title && value && type)) {
      throw Error(`All fields are required`);
    }

    if (!(type.includes('income') || type.includes('outcome'))) {
      throw Error(`Value of type isn't valided`);
    }
    if (type.includes('outcome')) {
      const { total } = this.transactionsRepository.getBalance();
      const valorTotal = total - value;
      if (valorTotal < 0) {
        throw Error(`You can't have a negative balance`);
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
