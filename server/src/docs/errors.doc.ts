import {ApiProperty} from '@nestjs/swagger';

export class ErrorFieldsSwagger {
  @ApiProperty({description: 'Error message(s) related to the field', example: ['username must be a string']})
  message: string[];

  @ApiProperty({description: 'HTTP error description', example: 'Bad Request'})
  error: string;

  @ApiProperty({description: 'HTTP status code', example: 400})
  statusCode: number;
}

export class ErrorDefaultSwagger {
  @ApiProperty({description: 'Error message related to the field', example: ['username must be a string']})
  message: string;

  @ApiProperty({description: 'HTTP status code', example: 400})
  statusCode: number;
}
