import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Event {
    [x: string]: any
    @PrimaryGeneratedColumn() // PrimaryGeneratedColumn === AUTO_INCREMENT
    id: number

    @Column()
    title: string

    @Column()
    date: string

    @Column()
    loc: string

    @Column()
    price: number
}