import { randomBytes, pbkdf2 } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

export interface ICompare {
  passwordHash: string;
  password: string;
}

export interface IHash {
  password: string;
  salt?: string;
}

const ERROR_PASSWORD: string = 'Credentials invalid';

@Injectable()
export class PasswordUtil {
  public passwordLength = 128;
  public saltLen = 16;
  public iterations = 10000;
  public digest = 'sha512';

  /*** Password hash */
  public hash = async ({ password, salt }: IHash): Promise<string> => {
    salt = salt || randomBytes(this.saltLen).toString('hex').slice(0, this.saltLen);

    const hash = await promisify(pbkdf2)(
      password,
      salt,
      this.iterations,
      this.passwordLength,
      this.digest,
    );

    return [salt, this.iterations.toString(), hash.toString('hex')].join('.');
  };

  /*** Validation a password */
  public compare = async ({ passwordHash, password }: ICompare): Promise<boolean> => {
    try {
      const [salt, iterations, hash] = passwordHash.split('.');

      if (!iterations || !hash) throw new Error(ERROR_PASSWORD);

      const checkHashed = await this.hash({ password, salt });

      if (checkHashed !== passwordHash) throw new Error(ERROR_PASSWORD);

      return true;
    } catch (error) {
      throw new Error(ERROR_PASSWORD);
    }
  };
}
