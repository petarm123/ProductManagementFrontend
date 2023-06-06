import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  productDetails: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    categories: []
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
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categories: ['']
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id'));

        if (id) {
          this.productService.getProduct(id).subscribe({
            next: (response) => {
              this.productDetails = response;
              this.form.patchValue({
                id: this.productDetails.productId,
                name: this.productDetails.name,
                description: this.productDetails.description,
                price: this.productDetails.price
              });
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      }
    });

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  saveProduct(): void {
    if (this.form.invalid) {
      return;
    }

    console.log('productDetails:', this.productDetails);
  
    const selectedCategoryId = this.form.value.categories;
    const selectedCategory = this.categories.find(category => category.categoryId === selectedCategoryId);
    const updatedProduct: Product = {
      ...this.productDetails,
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      categories: selectedCategory ? [selectedCategory] : []
    };
  
    console.log('updated productDetails:', updatedProduct);
  
    this.productService.updateProduct(updatedProduct.productId, updatedProduct)
      .subscribe({
        next: (response) => {
          console.log('Product saved successfully:', response);
          this.router.navigate(['products']);
        },
        error: (error) => {
          console.error('Error saving product:', error);
        }
      });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['products']);
        }
      });
  }

  updateCategories(event: any): void {
    if (event && event.value) {
      const categoriesControl = this.form.get('categories');
      if (categoriesControl) {
        categoriesControl.setValue(event.value);
      }
    }
  }
}
