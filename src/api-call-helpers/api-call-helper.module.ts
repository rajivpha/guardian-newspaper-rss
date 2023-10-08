import { Global, Module } from '@nestjs/common';
import { ApiCallHelper } from './api-call-helper.service';

@Global()
@Module({
  imports: [],
  providers: [ApiCallHelper],
  exports: [ApiCallHelper],
})
export class ApiCallHelperModule {}
