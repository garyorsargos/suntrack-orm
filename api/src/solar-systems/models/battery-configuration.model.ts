import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class BatteryConfiguration {
  @Field(() => ID)
  id: string;

  @Field()
  solarSystemId: string;

  @Field({ nullable: true })
  batteryManufacturer?: string;

  @Field({ nullable: true })
  batteryModel?: string;

  @Field(() => Float, { nullable: true })
  ratedCapacityKw?: number;

  @Field(() => Float, { nullable: true })
  ratedCapacityKwh?: number;

  @Field(() => Float, { nullable: true })
  batteryPrice?: number;
} 