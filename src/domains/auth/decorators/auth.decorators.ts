import { UseGuards } from '@nestjs/common';
import { AuthOnlyGuard } from '../guards/authOnly.guard';
import { GuestOnlyGuard } from '../guards/guestOnly.guard';
import { IncludeRefreshGuard } from '../guards/include-refresh.guard';

export const AuthOnly = () => UseGuards(AuthOnlyGuard);
export const GuestOnly = () => UseGuards(GuestOnlyGuard);
export const RequireRefreshToken = () => UseGuards(IncludeRefreshGuard);
