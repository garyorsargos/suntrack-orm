import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ModuleConfiguration } from './module-configuration.model';
import { InverterConfiguration } from './inverter-configuration.model';
import { BatteryConfiguration } from './battery-configuration.model';

@ObjectType()
export class SolarSystem {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  dataProvider1?: string;

  @Field({ nullable: true })
  dataProvider2?: string;

  @Field({ nullable: true })
  systemId1?: string;

  @Field({ nullable: true })
  systemId2?: string;

  @Field({ nullable: true })
  installationDate?: Date;

  @Field(() => Float, { nullable: true })
  pvSystemSizeDc?: number;

  @Field(() => Float, { nullable: true })
  totalInstalledPrice?: number;

  @Field({ nullable: true })
  customerSegment?: string;

  @Field({ nullable: true })
  expansionSystem?: boolean;

  @Field({ nullable: true })
  multiplePhaseSystem?: boolean;

  @Field(() => Float, { nullable: true })
  rebateOrGrant?: number;

  @Field({ nullable: true })
  ttsLinkId?: string;

  @Field({ nullable: true })
  newConstruction?: boolean;

  @Field({ nullable: true })
  tracking?: boolean;

  @Field({ nullable: true })
  groundMounted?: boolean;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  utilityServiceTerritory?: string;

  @Field({ nullable: true })
  thirdPartyOwned?: boolean;

  @Field({ nullable: true })
  installerName?: string;

  @Field({ nullable: true })
  selfInstalled?: boolean;

  @Field(() => [ModuleConfiguration], { nullable: true })
  moduleConfigurations?: ModuleConfiguration[];

  @Field(() => [InverterConfiguration], { nullable: true })
  inverterConfigurations?: InverterConfiguration[];

  @Field(() => [BatteryConfiguration], { nullable: true })
  batteryConfigurations?: BatteryConfiguration[];
} 