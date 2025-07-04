import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Follow } from '../follow/follow.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: 'fan' | 'celebrity';


    @OneToMany(() => Follow, (follow) => follow.fan)
    follows: Follow[];
}
