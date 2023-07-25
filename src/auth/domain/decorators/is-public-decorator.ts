import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'IsPublic';
export const isPublic = () => SetMetadata(IS_PUBLIC_KEY, true)
