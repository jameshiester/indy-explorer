import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
class Pointer {
  @PrimaryColumn()
  ledger!: number;

  @Column()
  sequence!: number;
}

export default Pointer;
