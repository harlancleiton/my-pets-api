import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Param,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserResponse, UserRegister } from './dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserResponse, isArray: true })
  async index() {
    const json = await this.userService.findAll();
    return plainToClass(UserResponse, json);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: UserResponse })
  async store(@Body() user: UserRegister) {
    const json = (await this.userService.create(user)).toJSON();
    return plainToClass(UserResponse, json);
  }

  @Put(':id')
  @HttpCode(204)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() user: UserRegister) {
    const json = (await this.userService.update(id, user)).toJSON();
    return plainToClass(UserResponse, json);
  }
}
