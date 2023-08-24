import { Controller, Post, Body, Put, Param, Get, Delete, Query, Res } from '@nestjs/common';
import { ProfileService } from 'src/Repository/profile.service';
import { Profile } from '@prisma/client';
import { Response } from 'express';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get("/create-user-profile")
    async createProfile(@Query('profileData') profileData: Profile, @Res() response: Response): Promise<void> {
        try {
            const createdProfile = await this.profileService.createProfile(profileData);
            if (createdProfile) {
                response.status(201).json({ message: "profile created success", createdProfile });
            } else {
                response.status(400).json({ message: 'Failed to create profile' });
            }
        } catch (error) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get('/get-profile')
    async getUserProfile(@Query('userEmail') userEmail: string, @Res() response: Response): Promise<void> {
        try {
            const userWithProfile = await this.profileService.getUserWithProfile(userEmail);

            if (userWithProfile) {
                response.status(200).json({message:"profile visited ",userWithProfile});
            } else {
                response.status(404).json({ message: 'User profile not found' });
            }
        } catch (error) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }
    
}
