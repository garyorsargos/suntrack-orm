import { Resolver, Query, Args } from '@nestjs/graphql';
import { SolarSystemsService } from './solar-systems.service';
import { SolarSystem } from './models/solar-system.model';

@Resolver(() => SolarSystem)
export class SolarSystemsResolver {
  constructor(private readonly solarSystemsService: SolarSystemsService) {}

  @Query(() => [SolarSystem])
  async solarSystems() {
    return this.solarSystemsService.findAll();
  }

  @Query(() => SolarSystem, { nullable: true })
  async solarSystem(@Args('id') id: string) {
    return this.solarSystemsService.findOne(id);
  }
} 