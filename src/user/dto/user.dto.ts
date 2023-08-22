import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '../../auth/enum/role.enum';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: ROLE,
  })
  role: ROLE;

  @ApiProperty()
  createdAt: Date;
}
