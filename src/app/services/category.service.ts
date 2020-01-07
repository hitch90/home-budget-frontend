import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    categoryRoute = environment.api_url + '/' + environment.routes.category;
    categoriesRoute = environment.api_url + '/' + environment.routes.categories;
  constructor(
      private httpClient: HttpClient
  ) { }
  
  findAll(limit: number = 0) {
      return this.httpClient.get(this.categoriesRoute + `?limit=${limit}`);
  }
  
  create(category) {
      return this.httpClient.post(this.categoryRoute, category);
  }
}
