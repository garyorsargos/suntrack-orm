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

  @Query(() => [SolarSystem])
  async solarSystemsByLocation(
    @Args('city', { nullable: true }) city?: string,
    @Args('state', { nullable: true }) state?: string,
  ) {
    return this.solarSystemsService.findByLocation(city, state);
  }

  @Query(() => [String])
  async states() {
    return this.solarSystemsService.getStates();
  }

  @Query(() => String)
  async dataStats() {
    const stats = await this.solarSystemsService.getDataStats();
    return JSON.stringify(stats);
  }
} 