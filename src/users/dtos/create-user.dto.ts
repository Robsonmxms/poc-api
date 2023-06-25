import { IsEmail, IsOptional, Length, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @Length(1, 20)
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email' })
    email?: string;

    @IsOptional()
    @IsStrongPassword(
        { minLength: 8 },
        {
            message:
                'Password must contain at least 8 characters and be strong',
        },
    )
    pass?: string;
}
