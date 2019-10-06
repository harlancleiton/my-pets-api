import { registerEnumType } from 'type-graphql';

export enum PetTypeEnum {
  CAT = 'CAT',
  DOG = 'DOG',
  OTHER = 'OTHER',
}

registerEnumType(PetTypeEnum, {
  name: 'PetTypeEnum',
  description: 'Lorem Ipsum',
});
