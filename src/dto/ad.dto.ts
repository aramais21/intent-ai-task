import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from './common.dto';

export enum AdTypeEnum {
  Banner = 'BANNER',
  Video = 'VIDEO',
  Audio = 'AUDIO',
}

export class AdDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  media: string;

  @IsUrl()
  @ApiProperty()
  @IsString()
  domain: string;

  @IsNumber()
  @Min(0)
  minPrice: number;

  @IsNumber()
  @Min(0)
  maxPrice: number;

  @IsEnum(AdTypeEnum)
  @ApiProperty()
  type: AdTypeEnum;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  categories: string[];
}

export class AdQueryDto extends PaginationQueryDto {}
