import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserModel: any;
  const mockJwt = { sign: jest.fn().mockReturnValue('token123') };
  const plainPassword = 'pass';

  beforeEach(() => {
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);

    mockUserModel = {
      findOne: jest.fn().mockResolvedValue({
        _id: 'abc123',
        email: 'test@test.com',
        password: hashedPassword,
      }),
    };

    service = new AuthService(mockJwt as any, mockUserModel as any);
  });

  it('debería hashear la contraseña correctamente', async () => {
    const hash = await service.hashPassword('password');
    const match = await bcrypt.compare('password', hash);
    expect(match).toBe(true);
  });

  it('debería validar al usuario si la contraseña es correcta', async () => {
    const user = await service.validateUser('test@test.com', plainPassword);
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@test.com');
  });

  it('debería retornar null si la contraseña es incorrecta', async () => {
    const incorrectHash = bcrypt.hashSync('otra_contraseña', 10);

    mockUserModel.findOne = jest.fn().mockResolvedValue({
      _id: 'abc123',
      email: 'test@test.com',
      password: incorrectHash,
    });

    service = new AuthService(mockJwt as any, mockUserModel as any);

    const result = await service.validateUser('test@test.com', plainPassword);
    expect(result).toBeNull();
  });

  it('debería generar un token válido al hacer login', async () => {
    const user = { _id: 'abc123', email: 'test@test.com', password: plainPassword };
    const result = await service.login(user);

    expect(result.access_token).toBe('token123');
    expect(mockJwt.sign).toHaveBeenCalledWith({
      email: 'test@test.com',
      sub: 'abc123',
    });
  });
});