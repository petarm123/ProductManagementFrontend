import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'categories',
    component: CategoriesListComponent
  },
  {
    path: 'products/add',
    component: AddProductComponent
  },
  {
    path: 'categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'categories/edit/:id',
    component: EditCategoryComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
