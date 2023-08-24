import { Controller, Post, Body, Put, Param, Get, Delete, Query, Res } from '@nestjs/common';
import { UsersService } from 'src/Repository/user.service';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post("/signup")
  async createUser(@Body() userData: User) {
    const user = await this.usersService.createUser(userData);
    return user;
  }

  @Get()
  async getAllUsers(@Body() limitedData: number) {
    const users = await this.usersService.getAllUsers(limitedData);
    return users;
  }

  @Put('/update/:id')
  async updateUser(@Param('id') userId: number, @Body() userData: User): Promise<User> {
    const updatedUser = await this.usersService.updateUser(userId, userData)
    return updatedUser;
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') userId: number) {
    const deletedUser = await this.usersService.deleteUser(userId);
    return { message: 'User deleted successfully', deletedUser };
  }

  @Put('/findByName/:name')
  async findByNameUser(@Param('name') name: String, @Body() userData: User): Promise<User[]> {
    const updatedUser = await this.usersService.findByName(name);
    return updatedUser;
  }

  @Put('/findByEmail/:email')
  async findByEmail(@Param('email') email: String, @Body() userData: User): Promise<User> {
    const User = await this.usersService.findUsersByEmail(email);
    return User;
  }

  @Get('/search')
  async searchUsers(@Query('query') query: string, @Res() res: Response) {
    const users = await this.usersService.searchUsersByNameAndEmail(query);
    if (users.length)
      res.json({ message: "successfully user found", total: users.length, users });
    res.json({ message: "user not found", total: users.length });
  }

  @Post('/filter')
  async filterUser(@Body() data: number): Promise<User[]> {
    const user = await this.usersService.userFilter(data);
    return user;
  }

  @Get("/sort")
  async getSortUser(@Query('sortField') sortField: string, @Query('sortOrder') sortOrder: 'asc' | 'desc') {
    const sortedUsers = await this.usersService.findAllWithSorting(sortField, sortOrder);
    return sortedUsers;
  }

}
