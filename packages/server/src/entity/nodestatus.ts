import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

@Entity()
class NodeStatus {
  @AfterLoad()
  parse() {
    this.timestamp = Number(this.timestamp);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column('bigint')
  timestamp?: number;

  @Column({ nullable: true })
  indy_version?: string;

  @Column('decimal', { nullable: true })
  read_throughput?: number;

  @Column('decimal', { nullable: true })
  write_throughput?: number;

  @Column()
  active?: boolean;
}

export default NodeStatus;
