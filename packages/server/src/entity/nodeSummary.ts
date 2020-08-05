import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';
import { INodesStatusSummary } from 'model';

@Entity()
class NodesStatusSummary implements INodesStatusSummary {
  @AfterLoad()
  parse() {
    this.timestamp = Number(this.timestamp);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column('bigint')
  timestamp?: number;

  @Column('decimal', { nullable: true })
  read_throughput?: number;

  @Column('decimal', { nullable: true })
  write_throughput?: number;

  @Column()
  active?: number;
}

export default NodesStatusSummary;
