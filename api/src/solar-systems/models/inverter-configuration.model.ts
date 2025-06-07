import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class InverterConfiguration {
  @Field(() => ID)
  id: string;

  @Field()
  solarSystemId: string;

  @Field()
  configurationNumber: number;

  @Field({ nullable: true })
  inverterManufacturer?: string;

  @Field({ nullable: true })
  inverterModel?: string;

  @Field({ nullable: true })
  inverterQuantity?: number;

  @Field({ nullable: true })
  microInverter?: boolean;

  @Field({ nullable: true })
  builtInMeter?: boolean;

  @Field(() => Float, { nullable: true })
  outputCapacity?: number;
} 