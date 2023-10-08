import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { RequestMethod, RequestOptions } from './helper.interfaces';
import logger from 'src/logger';

@Injectable()
export class ApiCallHelper {
  constructor() {}
  call = async <T = any>(
    requestMethod: RequestMethod,
    url: string,
    headers?: any | null,
    body?: any | null
  ): Promise<AxiosResponse<T>> => {
    try {
      const options: RequestOptions | any = {
        method: requestMethod ? requestMethod : RequestMethod.GET,
        url: url,
        data: body,
      };
      options.headers = headers ? headers : { 'content-type': 'application/json' };

      const a = await axios(options);
      return a;
    } catch (err) {
      logger.error(err.stack);
      throw new Error(err.message);
    }
  };
}
