import { ValidationException } from './../exceptions/validation.exception';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata):Promise<any> {
    const obj = plainToClass(metadata.metatype,value);
    const errors = await validate(obj)

    if(errors.length){
      let messages = errors.map(err=>{
        return {property:err.property,value:Object.values(err.constraints).join(', ')}
      })
      throw new ValidationException(messages)
    }
    return value
  }
}
