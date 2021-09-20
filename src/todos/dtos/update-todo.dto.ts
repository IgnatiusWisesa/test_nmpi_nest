import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class UpdateTodo {
    @ApiProperty()
    @MaxLength(20)
    task?: string
}