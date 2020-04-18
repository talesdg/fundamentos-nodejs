import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const balance = this.getBalance();
    return this.transactions;
  }

  public getBalance(): Balance {
    const valueIncome = this.transactions
      .filter(item => item.type === 'income')
      .reduce((sum, current) => sum + current.value, 0);

    const valueOutcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((sum, current) => sum + current.value, 0);

    const total = valueIncome - valueOutcome;

    const balance: Balance = {
      income: valueIncome,
      outcome: valueOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
