import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { GrammarController } from './grammar/grammar.controller';
import { DirsModule } from './dirs/dirs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true
      }),
    }),
    NotesModule,
    DirsModule
  ],
  controllers: [GrammarController],
})
export class AppModule {}
