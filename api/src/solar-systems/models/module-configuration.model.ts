import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ModuleConfiguration {
  @Field(() => ID)
  id: string;

  @Field()
  solarSystemId: string;

  @Field()
  configurationNumber: number;

  @Field(() => Float, { nullable: true })
  azimuth?: number;

  @Field(() => Float, { nullable: true })
  tilt?: number;

  @Field({ nullable: true })
  moduleManufacturer?: string;

  @Field({ nullable: true })
  moduleModel?: string;

  @Field({ nullable: true })
  moduleQuantity?: number;

  @Field({ nullable: true })
  technologyType?: string;

  @Field({ nullable: true })
  bipv?: boolean;

  @Field({ nullable: true })
  bifacial?: boolean;

  @Field(() => Float, { nullable: true })
  nameplateCapacity?: number;

  @Field(() => Float, { nullable: true })
  efficiency?: number;
} 