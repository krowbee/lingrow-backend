import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Create task with answers' })
  @ApiBody({ type: CreateTaskDto })
  @Post('/')
  async createTask(@Body() data: CreateTaskDto) {
    const task = await this.taskService.saveTask(data);
    return task;
  }

  @ApiOperation({ summary: 'Update task with answers' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiParam({ name: 'taskId', type: Number })
  @Patch('/:taskId')
  async updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() data: UpdateTaskDto,
  ) {
    const task = await this.taskService.saveTask(data, taskId);
    return task;
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiParam({ name: 'taskId', type: Number })
  @Delete('/:taskId')
  async deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    const task = await this.taskService.deleteTask(taskId);
    return task;
  }
}
