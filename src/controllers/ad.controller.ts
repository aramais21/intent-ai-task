import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AdDto, AdQueryDto } from '../dto/ad.dto';
import { AdService } from '../services/ad.service';
import {
  ApiSuccessResponse,
  ApiSuccessResponseWithData,
} from '../decorator/api-response.decorator';

@Controller('/ad')
export class AdController {
  constructor(private adService: AdService) {}

  @Post('/')
  @HttpCode(200)
  @ApiSuccessResponse()
  async createAd(@Body() data: AdDto) {
    try {
      await this.adService.createAd(data);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiSuccessResponse()
  async deleteAd(@Param('id') id: string) {
    try {
      await this.adService.deleteById(id);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Get('/')
  @HttpCode(200)
  @ApiSuccessResponseWithData([AdDto])
  async get(@Query() data: AdQueryDto) {
    try {
      const response = await this.adService.get(data);
      return {
        success: true,
        response,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiSuccessResponse()
  async update(@Param('id') id: string, @Body() data: AdDto) {
    try {
      await this.adService.updateById(id, data);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
}
