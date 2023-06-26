import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: process.env.AUTH_KEY,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const EXPIRATION_TIME = 3600;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
