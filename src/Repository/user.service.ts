import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismAa/prisma.service'; // Make sure this path is correct
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: User) {
    const user = await this.prisma.client.user.create({ data });
    return user;
  }

  async updateUser(userId, data): Promise<User | null> {
    const updatedUser = await this.prisma.client.user.update({
      where: { id: userId - 0 },
      data: {
        ...data
      }
    });

    return updatedUser;
  }

  async getAllUsers(limitedData): Promise<User[] | null> {
    const users = await this.prisma.client.user.findMany({
      take: limitedData.limit - 0,
      skip: limitedData.offset - 0,
    });
    return users;
  }

  async findByName(name): Promise<User[] | null> {
    const users = await this.prisma.client.user.findMany({
      where: {
        name: {
          equals: name
        }
      }
    });
    return users;
  }

  async findUsersByEmail(email): Promise<User | null> {
    try {
      const user = await this.prisma.client.user.findUnique({
        where: {
          email: email
        },
      })
      console.log(user)
      return user;
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(userId: number): Promise<User | null> {
    const deletedUser = await this.prisma.client.user.delete({
      where: { id: userId - 0 },
    });
    return deletedUser;
  }

  async searchUsersByNameAndEmail(query: string): Promise<User[]> {
    const letters = query.split("");
    const users = await this.prisma.client.user.findMany({
      where: {
        OR: [
          {
            AND: letters.map(letter => ({
              name: {
                contains: letter,
              },
            })),
          },
          {
            AND: letters.map(letter => ({
              email: {
                contains: letter,
              },
            })),
          },
        ],
      },
    });
    return users;
  }

  async userFilter(data) {
    const user = await this.prisma.client.user.findMany({
      where: {
        age: {
          gt: data.gt,
          lt: data.lt,
        },
      },
    });
    return user;
  }

  async findAllWithSorting(sortField: string, sortOrder: 'asc' | 'desc') {
    const validFields = ['name', 'age']; // Adjust based on your User model fields
    const field = validFields.includes(sortField) ? sortField : 'createdAt';

    const sortedUsers = await this.prisma.client.user.findMany({
      orderBy: {
        [field]: sortOrder,
      },
    });

    return sortedUsers;
  }

}
