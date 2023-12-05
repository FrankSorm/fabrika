import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
// import { ConfigModule, ConfigService } from "@nestjs/config";
import { FabrikaConfigModule } from './config/config.module';

@Module({
  imports: [
    FabrikaConfigModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // MongooseModule.forRoot('mongodb+srv://fabrika:yhh4Ju0UKd3shuAx@fabrika.mcflqih.mongodb.net/?retryWrites=true&w=majority'),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}