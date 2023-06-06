import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  form!: FormGroup;
  products: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      products: ['']
    });

    this.categoriesService.getAllProducts().subscribe(
      (products: any[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log('Products: ', this.form.value)

    this.categoriesService.addCategory(this.form.value).subscribe(
      (category: Category) => {
        console.log('Category added:', category);
        this.router.navigate(['/categories']);
      },
      (error: any) => {
        console.error('Failed to add category:', error);
      }
    );
  }

  updateProducts(event: any) {
    if (event && event.value) {
      const productsControl = this.form.get('products');
      if (productsControl) {
        productsControl.setValue(event.value);
      }
    }
  }
}
