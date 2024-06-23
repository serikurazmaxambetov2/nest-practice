import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenerateGptRequestDto } from 'src/dto/gpt/generate-gpt-request.dto';
import { BadRequestResponseDto } from 'src/dto/responses/error/bad-request-response.dto';
import { GenerateGptResponseDto } from 'src/dto/responses/gpt/generate-gpt-response';
import { GptService } from 'src/services/gpt.service';

@ApiTags('GPT')
@Controller('gpt')
export class GptController {
  constructor(private gptService: GptService) {}

  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiCreatedResponse({ type: GenerateGptResponseDto })
  @Post('generate')
  async generate(@Body() generateDto: GenerateGptRequestDto) {
    return await this.gptService.generate(generateDto);
  }
}
