import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import { TransactionType, IndyTransaction, IndyRoleType } from 'model';

export interface ITransaction {
  added?: number;
  sequence: number;
  ledger: number;
  transactionType?: TransactionType;
  role?: IndyRoleType;
  transactionId?: string;
  value?: IndyTransaction;
  source?: string;
  destination?: string;
}

@Entity()
class Transaction implements ITransaction {
  @BeforeInsert()
  updateDates() {
    this.added = Date.now();
  }

  @PrimaryColumn('int')
  sequence!: number;

  @PrimaryColumn('int')
  ledger!: number;

  @Column({ nullable: true })
  transactionType?: TransactionType;

  @Column({ nullable: true })
  role?: IndyRoleType;

  @Column({ nullable: true })
  transactionId?: string;

  @Column('bigint')
  added?: number;

  @Column('simple-json')
  value?: IndyTransaction;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  destination?: string;
}

export default Transaction;
