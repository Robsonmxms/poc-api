import { IsOptional, Length } from 'class-validator';

export class CreateActivityDto {
    @IsOptional()
    @Length(1, 20)
    name?: string;

    @IsOptional()
    @Length(5, 50)
    description?: string;
}
