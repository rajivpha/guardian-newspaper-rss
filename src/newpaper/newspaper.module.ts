import { Module } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { NewspaperController } from './newspaper.controller';
import { ApiCallHelperModule } from 'src/api-call-helpers/api-call-helper.module';

@Module({
  imports: [ApiCallHelperModule],
  controllers: [NewspaperController],
  providers: [NewspaperService],
  exports: [NewspaperService],
})
export class NewspaperModule {}
