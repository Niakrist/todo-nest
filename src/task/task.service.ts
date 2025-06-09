import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskEntity: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return this.taskEntity.find();
  }

  async findOneById(id: string): Promise<TaskEntity> {
    const task = await this.taskEntity.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Задача с id ${id} не найдна`);
    }
    return task;
  }

  async create(dto: TaskDto): Promise<TaskDto> {
    const task = await this.taskEntity.create(dto);
    await this.taskEntity.save(task);
    return task;
  }
  async update(id: string, dto: TaskDto): Promise<TaskEntity> {
    const task = await this.findOneById(id);

    Object.assign(task, dto);

    // task.title = dto.title;
    // task.isDone = dto.isDone;
    await this.taskEntity.save(task);
    return task;
  }

  async delete(id: string): Promise<TaskEntity> {
    const task = await this.findOneById(id);
    await this.taskEntity.remove(task);
    return task;
  }
}
