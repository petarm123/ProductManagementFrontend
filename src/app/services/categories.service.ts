import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { environment } from 'src/environments/environment'; 
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
//import { Category } from '../models/category.model';

export const environment = {
  production: false,
  baseApiUrl: "https://localhost:7006"
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiUrl + '/api/Categories').pipe(
      tap(categories => console.log(categories))
    );
  }

  addCategory(addCategoryRequest: Category): Observable<Category> {
    return this.http.post<Category>(this.baseApiUrl + '/api/Categories', addCategoryRequest, httpOptions);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products').pipe(
      tap(products => console.log(products))
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.baseApiUrl + '/api/Categories/' + id)
  }

  updateCategory(id: number, updateCategoryRequest: Category):
  Observable<Category> {
    return this.http.put<Category>(this.baseApiUrl + '/api/Categories/' + id, 
    updateCategoryRequest, httpOptions);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(this.baseApiUrl + '/api/Categories/' + id);
  }

  getCategoriesByIds(categoryIds: number[]): Observable<Category[]> {
    const url = this.baseApiUrl + '/api/Categories/';
    return this.http.post<Category[]>(url, categoryIds, httpOptions);
  }
}

