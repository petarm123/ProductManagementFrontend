import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    CategoriesListComponent,
    AddProductComponent,
    AddCategoryComponent,
    EditProductComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
