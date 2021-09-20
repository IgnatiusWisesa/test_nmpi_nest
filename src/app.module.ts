import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TodosModule, UsersModule, MongooseModule.forRoot(`mongodb+srv://root:root@test.ek9rd.mongodb.net/todos?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
