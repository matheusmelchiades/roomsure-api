import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RoomsFiltersDTO {
  @IsString()
  @IsOptional()
  q?: string = '';

  @IsNumberString()
  @IsOptional()
  guests?: string = '';

  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  limit: number;
}
