import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IRoom } from './room.interface';

@Entity('rooms')
export class Room implements IRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column('json', { array: true })
  images: string[];

  @Column('int', { default: 0 })
  price: number;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column({ nullable: false })
  address: string;

  @Column('int', { default: 0 })
  capacity: number;
}
