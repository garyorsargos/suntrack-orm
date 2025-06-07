import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SolarSystemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.solarSystem.findMany({
      include: {
        moduleConfigurations: true,
        inverterConfigurations: true,
        batteryConfigurations: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.solarSystem.findUnique({
      where: { id },
      include: {
        moduleConfigurations: true,
        inverterConfigurations: true,
        batteryConfigurations: true,
      },
    });
  }
} 