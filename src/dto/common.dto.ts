import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ required: false })
  limit?: number = 20;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  offset?: string;
}
