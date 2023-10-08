import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ApiCallHelper } from 'src/api-call-helpers/api-call-helper.service';
import {
  GuardianAPIResponse,
  RequestMethod,
  Result,
} from 'src/api-call-helpers/helper.interfaces';
import constant from 'src/config/constant';

@Injectable()
export class NewspaperService {
  constructor(
    readonly configService: ConfigService,
    readonly apiCallHelper: ApiCallHelper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getSectionData(sectionName: string): Promise<Result[]> {
    //get section data from cache
    const cachedSectionData: Result[] = await this.cacheManager.get(sectionName);
    if (cachedSectionData) return cachedSectionData;

    //get guardian config
    const guardianConfig = this.configService.get('GUARDIAN');

    const url =
      guardianConfig.BASEURL + `/${sectionName}?api-key=${guardianConfig.API_KEY}`;

    //call guardian API endpoint
    const { status, data } = await this.apiCallHelper.call<GuardianAPIResponse>(
      RequestMethod.GET,
      url
    );

    if (status !== 200) {
      throw new BadRequestException('API call failed');
    }

    //set response data to cache
    await this.cacheManager.set(
      sectionName,
      data.response.results,
      constant.CACHE.VALIDITY
    );

    return data.response.results;
  }
}
