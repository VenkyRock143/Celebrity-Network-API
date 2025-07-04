import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { Celebrity } from '../celebrity/celebrity.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follows)
  fan: User;

  @ManyToOne(() => Celebrity, { eager: true })
  celebrity: Celebrity;
}
