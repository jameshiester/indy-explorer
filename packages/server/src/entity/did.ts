import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';
import { TransactionType, IndyTransaction, IndyRoleType, IDid } from 'model';
import { mapRoleTypeToName } from '../util';

@Entity()
class Did implements IDid {
  @BeforeInsert()
  mapRoleType() {
    this.roleName = mapRoleTypeToName(this.role);
  }

  @PrimaryColumn()
  id!: string;

  @Column({ nullable: true })
  from?: string;

  @Column({ nullable: true })
  role?: IndyRoleType;

  @Column()
  verkey?: string;

  @Column({ nullable: true })
  roleName?: string;

  @Column({ type: 'simple-json' })
  attributes?: any;
}

export default Did;
