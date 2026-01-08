import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from 'src/domains/auth/session/session.module';
import { UserModule } from 'src/user/user.module';
import { TokenService } from './tokens/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GuestOnlyGuard } from './guards/guestOnly.guard';
import { AuthOnlyGuard } from './guards/authOnly.guard';
import { IncludeRefreshGuard } from './guards/include-refresh.guard';
import { CryptoService } from './crypto.service';

@Global()
@Module({
  imports: [UserModule, SessionModule, JwtModule.register({})],
  providers: [
    CryptoService,
    TokenService,
    AuthService,
    GuestOnlyGuard,
    AuthOnlyGuard,
    IncludeRefreshGuard,
  ],
  controllers: [AuthController],
  exports: [AuthModule, TokenService],
})
export class AuthModule {}
