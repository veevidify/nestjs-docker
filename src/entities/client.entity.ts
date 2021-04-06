import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, } from 'typeorm';
import { AccessToken } from './access_token.entity';
import { AuthorizationCode } from './authorization_code.entity';

@Entity()
@Unique(['id', 'clientId'])
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  clientId: string;

  // TODO: hash
  @Column()
  clientSecret: string;

  @Column({ type: 'text', array: true, default: '{ user }' })
  redirectUris: string[];

  @Column()
  isTrusted: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AccessToken, accessToken => accessToken.client, {
    cascade: ['remove'],
    eager: false,
  })
  accessTokens: AccessToken[];

  @OneToMany(() => AuthorizationCode, code => code.client, {
    cascade: ['remove'],
    eager: false,
  })
  authorizationCodes: AuthorizationCode[];

  // TODO: hash
  public static validateSecret = (client: Client, testSecret: string) => {
    return (testSecret === client.clientSecret);
  };
}
