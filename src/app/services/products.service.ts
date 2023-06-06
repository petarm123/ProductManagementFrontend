import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { environment } from 'src/environments/environment'; 
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

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
export class ProductsService {

  baseApiUrl: string = environment.baseApiUrl;
  selectedCategoryIds: Category[] = [];
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products').pipe(
      tap(products => console.log(products))
    );
  }

  addProduct(addProductRequest: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + '/api/Products', addProductRequest, httpOptions);
  }
  
  

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiUrl + '/api/Categories').pipe(
      tap(products => console.log(products))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/Products/' + id)
  }

  updateProduct(id: number, updateProductRequest: Product):
  Observable<Product> {
    return this.http.put<Product>(this.baseApiUrl + '/api/Products/' + id, 
    updateProductRequest, httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseApiUrl + '/api/Products/' + id);
  }

  getCategoriesByIds(categoryIds: number[]): Observable<Category[]> {
    const url = this.baseApiUrl + '/api/Categories/';
    return this.http.post<Category[]>(url, categoryIds, httpOptions);
  }

}
