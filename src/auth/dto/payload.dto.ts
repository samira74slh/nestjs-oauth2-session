import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

export class PayloadDto extends PickType(UserDto, ['id', 'role']) {}
