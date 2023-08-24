import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismAa/prisma.service'; // Make sure this path is correct
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async createProfile(userEmail: Profile) {
        try {
            const user = await this.prisma.client.user.findUnique({
                where: {
                    email: userEmail.toString(),
                },
            });
            console.log(user);

            if (!user) {
                throw new Error('User not found');
            }

            const profile = await this.prisma.client.profile.create({
                data: {
                    user: {
                        connect: {
                            email: userEmail.toString(),
                        },
                    },
                },
            });
            console.log(profile);

            return profile;
        } catch (error) {
            console.log("eroor", error)
            throw new Error(`Could not create profile: ${error.message}`);
        }
    }

    async getUserWithProfile(userEmail: string): Promise<Profile | null> {
        try {
            const user = await this.prisma.client.profile.findUnique({
                where: {
                    userEmail: userEmail
                },
                include: { user: true },
            })
            return user;
        } catch (error) {
            throw Error(error);
        }
    }

}
