import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class createTodo {
    @ApiProperty()
    @MaxLength(20)
    task: string
}