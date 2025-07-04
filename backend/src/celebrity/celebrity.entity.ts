import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Celebrity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: 'Singer' | 'Actor' | 'Speaker';

  @Column()
  country: string;

  @Column()
  instagram: string;

  @Column()
  photoUrl: string;

  @Column()
  fanbase: number;

  @Column("text", { array: true })
  setlist: string[];
}
