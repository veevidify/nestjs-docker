import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthService } from './oauth.service';
import { AccessToken } from 'src/entities/access_token.entity';
import { AuthorizationCode } from 'src/entities/authorization_code.entity';
import { Client } from 'src/entities/client.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthorizationCodeModel } from './models/authorization_code.model';
import { AuthorizationCodeProvider } from './providers/authorization_code.provider';
import { oauth } from 'src/config/constants';
import { AuthModule } from '../auth.module';
import { ClientBasicStrategy } from '../strategies/basic.strategy';
import { ClientPasswordStrategy } from '../strategies/client_password.strategy';
import { BearerStrategy } from '../strategies/bearer.strategy';
import { OAuthController } from './oauth.controller';

const modelFactory = {
  provide: oauth.MODEL_INJECT_TOKEN,
  useFactory: (oauthService: OAuthService) => {
    const model = new AuthorizationCodeModel(oauthService);
    return model;
  },
  inject: [OAuthService],
};

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken, AuthorizationCode, Client, User]), AuthModule],
  providers: [
    OAuthService,
    UsersService,
    ClientBasicStrategy,
    ClientPasswordStrategy,
    BearerStrategy,
    modelFactory,
    AuthorizationCodeProvider,
  ],
  exports: [TypeOrmModule, OAuthService],
  controllers: [OAuthController],
})
export class OAuthModule {}
