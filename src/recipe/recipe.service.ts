import { Injectable } from '@nestjs/common';
import { GetRecipesDto } from './dto/get-recipes.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EdamamResponse, Recipe } from './interface/edamam-response.interface';
import { Field } from './interface';
@Injectable()
export class RecipeService {
  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {}
  async searchRecipes(
    getRecipesDto: GetRecipesDto,
  ): Promise<{ next_page: string; recipes: Recipe[]; num_pages: number }> {
    try {
      let url = this.config.get('EDAMAM_URL');

      if (getRecipesDto.field) {
        if (getRecipesDto.field?.includes(Field.IMAGE)) {
          getRecipesDto.field = [...getRecipesDto.field, Field.IMAGES];
        }
        const field = getRecipesDto.field
          ?.map((value) => `field=${value}`)
          .join('&');
        delete getRecipesDto.field;
        url = `${url}?${field}`;
      }

      const response = await this.httpService.get(url, {
        params: {
          type: 'public',
          imageSize: getRecipesDto.field?.includes(Field.IMAGE)
            ? 'LARGE'
            : null,
          app_id: this.config.get('EDAMAM_APP_ID'),
          app_key: this.config.get('EDAMAM_APP_KEY'),
          q: getRecipesDto.query,
          ingr: getRecipesDto.ingredients,
          _cont: getRecipesDto.cont,
          ...getRecipesDto,
        },
      });
      const data: EdamamResponse = (await firstValueFrom(response)).data;

      if (getRecipesDto.field?.includes(Field.IMAGE)) {
        data.hits.map(
          (hit) => (hit.recipe.image = hit.recipe.images.LARGE.url),
        );
        data.hits.map((hit) => delete hit.recipe.images);
      }
      var next_page = '';
      if (data?._links?.next?.href) {
        next_page = new URL(data._links?.next?.href).searchParams.get('_cont');
      }

      return {
        num_pages: data.count,
        next_page: next_page,
        recipes: data.hits?.map((hit) => hit.recipe),
      };
    } catch (error) {
      throw error;
    }
  }
}
