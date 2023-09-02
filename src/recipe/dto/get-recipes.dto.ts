import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Co2EmissionsClass,
  CuisineType,
  Diet,
  DishType,
  Field,
  Health,
  MealType,
} from '../interface/input-recipe.enum';
import { Transform, TransformFnParams, Type } from 'class-transformer';

export class GetRecipesDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsOptional()
  @IsEnum(Diet)
  diet?: Diet;

  @IsOptional()
  @IsEnum(Health)
  health?: Health;

  @IsOptional()
  @IsEnum(CuisineType)
  cuisineType?: CuisineType;

  @IsOptional()
  @IsEnum(MealType)
  mealType?: MealType;

  @IsOptional()
  @IsEnum(DishType)
  dishType?: DishType;

  @IsOptional()
  @IsString()
  calories?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsEnum(Co2EmissionsClass)
  co2EmissionsClass: Co2EmissionsClass;

  @IsOptional()
  @IsArray()
  @IsEnum(Field, { each: true })
  @IsString({ each: true })
  @Transform(({ value }) => value.split(','), { toClassOnly: true })
  field?: Field[];

  @IsOptional()
  @IsString()
  cont?: string;
}
