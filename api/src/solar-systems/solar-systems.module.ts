import { Module } from '@nestjs/common';
import { SolarSystemsResolver } from './solar-systems.resolver';
import { SolarSystemsService } from './solar-systems.service';

@Module({
  providers: [SolarSystemsResolver, SolarSystemsService],
})
export class SolarSystemsModule {} 