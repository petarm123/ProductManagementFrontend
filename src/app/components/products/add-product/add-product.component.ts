import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categories: [[]]
    });

    this.productsService.getAllCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
  
    const payload = {
      ...this.form.value,
      Categories: this.form.value.categories  // Update property name to "Categories"
    };
  
    // Remove the 'categories' property from the payload
    delete payload.categories;
  
    console.log('Payload:', payload);
  
    this.productsService.addProduct(payload).subscribe(
      (product: Product) => {
        console.log('Product added:', product);
        this.router.navigate(['/products']);
      },
      (error: any) => {
        console.error('Failed to add product:', error);
      }
    );
  }
  
  

  updateCategories(event: any) {
    if (event && event.value) {
      const selectedCategories = event.value.map((categoryId: number) => {
        return { categoryId: categoryId, name: '', products: null };
      });
  
      const categoriesControl = this.form.get('categories');
      if (categoriesControl) {
        categoriesControl.setValue(selectedCategories);
      }
    }
  }
  
  }

