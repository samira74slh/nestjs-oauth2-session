import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class ValidateUserDto extends PickType(UserDto, ['name', 'email']) {}
