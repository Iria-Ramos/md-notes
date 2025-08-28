import { Note } from 'src/notes/note/note';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: 'folder' | 'note';

  @Column()
  name: string;

  @ManyToOne(() => Node, (node) => node.children, { nullable: true })
  parent?: Node;

  @OneToMany(() => Node, (node) => node.parent, { cascade: true })
  children: Node[];

  @Column({ type: 'int', nullable: true })
  noteId?: number;

  @ManyToOne(() => Note, { nullable: true })
  note?: Note;
}