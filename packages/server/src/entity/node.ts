import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
  AfterUpdate,
} from 'typeorm';
import { IndyValidatorData, INode } from 'model';

@Entity()
class IndyNode implements INode {
  @AfterLoad()
  parseAdded() {
    this.uptime_seconds = Number(this.uptime_seconds);
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateFields() {
    if (this.value) {
      this.did = this.value.Node_info.did;
      this.verkey = this.value.Node_info.verkey;
      this.indy_version = this.value.Software['indy-node'];
      this.uptime_seconds = this.value.Node_info.Metrics.uptime;
    }
  }

  @PrimaryColumn()
  name!: string;

  @Column()
  active!: boolean;

  @Column('simple-json', { nullable: true })
  value?: IndyValidatorData;

  @Column({ nullable: true })
  indy_version?: string;

  @Column({ nullable: true })
  did?: string;

  @Column({ nullable: true })
  verkey?: string;

  @Column('bigint', { nullable: true })
  uptime_seconds?: number;
}

export default IndyNode;
