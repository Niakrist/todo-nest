import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<TaskDto[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.findOneById(id);
  }

  @Post()
  create(@Body() dto: TaskDto): Promise<TaskDto> {
    return this.taskService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: TaskDto): Promise<TaskDto> {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.delete(id);
  }
}
