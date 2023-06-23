import { IsNotEmpty, Length } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @Length(1,20)
    name: string;
}