import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

enum SkillLevel {
  PSC1 = 0,
  PSE1 = 1,
  PSE2 = 2,
}

@Entity('sheet')
export class SheetEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  private reference: string;

  @Column({ type: 'varchar', length: 10 })
  private version: Date;

  @Column({ type: 'datetime' })
  private updatedDate: Date;

  @Column({ type: 'varchar', length: 200 })
  private title: string;

  @Column({ type: 'varchar', length: 20000 })
  private content: string;

  @Column({ type: 'integer' })
  private level: SkillLevel;

  @CreateDateColumn()
  private createdAdminDate: Date;

  @UpdateDateColumn()
  private updatedAdminDate: Date;
}
