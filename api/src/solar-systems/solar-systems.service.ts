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

  async findByLocation(city?: string, state?: string) {
    return this.prisma.solarSystem.findMany({
      where: {
        ...(city && { city }),
        ...(state && { state }),
      },
      include: {
        moduleConfigurations: true,
        inverterConfigurations: true,
        batteryConfigurations: true,
      },
    });
  }

  async getStates() {
    const states = await this.prisma.solarSystem.findMany({
      select: {
        state: true,
      },
      distinct: ['state'],
      where: {
        state: {
          not: null,
        },
      },
      orderBy: {
        state: 'asc',
      },
    });
    return states.map(s => s.state);
  }

  async getDataStats() {
    const totalCount = await this.prisma.solarSystem.count();
    const stateCounts = await this.prisma.solarSystem.groupBy({
      by: ['state'],
      _count: {
        state: true
      },
      orderBy: {
        _count: {
          state: 'desc'
        }
      }
    });
    const customerSegmentCounts = await this.prisma.solarSystem.groupBy({
      by: ['customerSegment'],
      _count: {
        customerSegment: true
      }
    });

    return {
      totalCount,
      stateCounts,
      customerSegmentCounts
    };
  }
} 