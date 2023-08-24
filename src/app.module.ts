import { Module } from '@nestjs/common';
import { UsersController } from './Controller/user.controller';
import { UsersService } from './Repository/user.service';
import { PrismaService } from './PrismAa/prisma.service';
import { ProfileController } from './Controller/profile.controller';
import { ProfileService } from './Repository/profile.service';

@Module({
  imports: [],
  controllers: [UsersController,ProfileController],
  providers: [UsersService,ProfileService,PrismaService],
})
export class AppModule {}
