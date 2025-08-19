import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { GrammarController } from './grammar/grammar.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'notes',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NotesModule,
  ],
  controllers: [GrammarController],
})
export class AppModule {}
