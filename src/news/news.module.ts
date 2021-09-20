import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

import { MongooseModule } from '@nestjs/mongoose';
import { newsSchema } from './schemas/news.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'News', schema: newsSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
