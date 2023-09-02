import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetRecipesDto } from './dto/get-recipes.dto';
import { RecipeService } from './recipe.service';
import { JwtGuard } from '../auth/guard';
import { Recipe } from './interface/edamam-response.interface';

@UseGuards(JwtGuard)
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Get('search')
  async SearchRecipes(
    @Query() dto: GetRecipesDto,
  ): Promise<{ next_page: string; recipes: Recipe[] }> {
    return await this.recipeService.searchRecipes(dto);
  }
}
