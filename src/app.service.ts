import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOk(): { state: string } {
    return { state: "OK" };
  }
}
