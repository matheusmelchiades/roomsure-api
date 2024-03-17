import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RoomsParamsDTO {
  @IsString()
  @IsUUID()
  @IsOptional()
  id: string;
}
