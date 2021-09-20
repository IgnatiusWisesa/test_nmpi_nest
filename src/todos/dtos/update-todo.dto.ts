import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class updateTodo {
    @ApiProperty()
    @MaxLength(20)
    task?: string
}