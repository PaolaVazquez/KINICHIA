import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExtractUrlDto {
  @ApiProperty({
    example: 'Hola, mira esta página https://google.com/oferta',
    description: 'Texto del mensaje del que se extraerán las URLs.',
  })
  @IsString()
  content!: string;
}
