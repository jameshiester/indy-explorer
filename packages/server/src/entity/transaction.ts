import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';
import {
  TransactionType,
  IndyTransaction,
  IndyRoleType,
  ITransaction,
} from 'model';
import { mapTransactionTypeToName, mapRoleTypeToName } from '../util';

@Entity()
class Transaction implements ITransaction {
  @BeforeInsert()
  updateDates() {
    this.added = Date.now();
  }

  @BeforeInsert()
  mapTransactionType() {
    this.transactionTypeName = mapTransactionTypeToName(this.transactionType);
  }

  @BeforeInsert()
  mapRoleType() {
    this.roleName = mapRoleTypeToName(this.role);
  }

  @AfterLoad()
  parseAdded() {
    this.added = Number(this.added);
  }

  @PrimaryColumn('int')
  sequence!: number;

  @PrimaryColumn('int')
  ledger!: number;

  @Column({ nullable: true })
  transactionType?: TransactionType;

  @Column({ nullable: true })
  transactionTypeName?: string;

  @Column({ nullable: true })
  role?: IndyRoleType;

  @Column({ nullable: true })
  roleName?: string;

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
