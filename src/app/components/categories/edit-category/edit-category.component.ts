import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  form!: FormGroup;
  products: Product[] = [];
  categoryDetails: Category = {
    categoryId: 0,
    name: '',
    products: []
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      products: ['']
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id'));

        if (id) {
          this.categoryService.getCategory(id).subscribe({
            next: (response) => {
              this.categoryDetails = response;
              this.form.patchValue({
                id: this.categoryDetails.categoryId,
                name: this.categoryDetails.name
              });
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      }
    });

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  saveCategory(): void {
    if (this.form.invalid) {
      return;
    }

    console.log('categoryDetails:', this.categoryDetails);
  
    const selectedProductId = this.form.value.products;
    const selectedProduct = this.products.find(product => product.productId === selectedProductId);
    const updatedCategory: Category = {
      ...this.categoryDetails,
      name: this.form.value.name,
      products: selectedProduct ? [selectedProduct] : []
    };
  
    console.log('updated categoryDetails:', updatedCategory);
  
    this.categoryService.updateCategory(updatedCategory.categoryId, updatedCategory)
      .subscribe({
        next: (response) => {
          console.log('Category saved successfully:', response);
          this.router.navigate(['categories']);
        },
        error: (error) => {
          console.error('Error saving category:', error);
        }
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['categories']);
        }
      });
  }

  updateProducts(event: any): void {
    if (event && event.value) {
      const productsControl = this.form.get('products');
      if (productsControl) {
        productsControl.setValue(event.value);
      }
    }
  }
}
