import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async findOne() {
    return 'Welcome !'
  }
}
