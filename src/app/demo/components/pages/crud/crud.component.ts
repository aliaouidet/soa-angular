import { Component, OnInit } from '@angular/core';
import { InventoryStatus, Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { ScategorieService } from 'src/app/demo/service/categorie.service';
import { Scategorie } from 'src/app/demo/api/scategorie';

interface ProductPayload {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    qtestock?: number;
    inventoryStatus?: InventoryStatus; // Change this to InventoryStatus
    category?: Scategorie;
    image?: string;
    rating?: string;
    cost?: number;
    dateCreated?: string;
    sales?: any[];
}

 

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService],
})
export class CrudComponent implements OnInit {
    productPayload: ProductPayload = {};
    processing = false;
    productDialog = false;
    deleteProductDialog = false;
    deleteProductsDialog = false;
    products: Product[] = [];
    categories: Scategorie[] = [];
    product: Product = {};
    selectedProducts: Product[] = [];
    submitted = false;
    cols: { field: string; header: string }[] = [];
    statuses = [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private categorieService: ScategorieService, // Add this line
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        this.products = await this.productService.getProducts();
        this.categories = await this.categorieService.getScategories(); // Fetch categories

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'price', header: 'Price' },
            { field: 'qtestock', header: 'Quantity' },
            { field: 'inventoryStatus', header: 'Inventory Status' },
            { field: 'category', header: 'Category' },
            { field: 'image', header: 'Image' },
            { field: 'rating', header: 'Rating' },
            { field: 'cost', header: 'Cost' },
            { field: 'dateCreated', header: 'Date Created' },
            { field: 'sales', header: 'Sales' },
        ];
    }

    openNew() {
        // Get the current date and time
    const currentDate = new Date();
    
    this.product = {
        dateCreated: currentDate.toISOString(), // Set the dateCreated to the current date and time
    };
    
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    async confirmDeleteSelected() {
        this.deleteProductsDialog = false;

        if (this.selectedProducts.length === 0) {
            // Inform the user or handle the case where no products are selected.
            return;
        }

        try {
            for (const selectedProduct of this.selectedProducts) {
                await this.productService.deleteProduct(selectedProduct.id);
                this.products = this.products.filter(
                    (val) => val.id !== selectedProduct.id
                );
            }

            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Products Deleted',
                life: 3000,
            });

            this.selectedProducts = [];
        } catch (error) {
            console.error('Error deleting products:', error);
        }
    }

    async confirmDelete() {
        console.log('Before delete request. Product ID:', this.product.id);

        this.deleteProductDialog = false;

        try {
            await this.productService.deleteProduct(this.product.id);
            console.log(
                'Product deleted successfully. Product ID:',
                this.product.id
            );

            this.products = this.products.filter(
                (val) => val.id !== this.product.id
            );
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Deleted',
                life: 3000,
            });
            this.product = {};
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    hideDialog() {
        
        this.productDialog = false;
        this.submitted = false;
    }

    async saveProduct() {
        this.submitted = true;
    
        if (this.product.name?.trim()) {
          try {
            this.processing = true;
    
            // Map the form data to the productPayload
            this.productPayload = {
                id: this.product.id,
                code: this.product.code,
                name: this.product.name,
                description: this.product.description,
                price: this.product.price,
                qtestock: this.product.qtestock, // Use the correct property name
                inventoryStatus: this.product.inventoryStatus, // Remove the type assertion 
                category: this.product.category,
                image: this.product.image,
                rating: this.product.rating,
                cost: this.product.cost,
                dateCreated: this.product.dateCreated,
                sales: this.product.sales || [],
            };
    
            // Save or update the product
            const savedProduct = await this.productService.saveProduct(this.productPayload);
    
            // Update the products list
            if (this.product.id) {
              const index = this.findIndexById(this.product.id);
              this.products[index] = savedProduct;
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Updated',
                life: 3000,
              });
            } else {
              this.products.push(savedProduct);
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Created',
                life: 3000,
              });
            }
    
            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
            this.processing = false;
          } catch (error) {
            this.processing = false;
            console.error('Error saving product:', error);
          }
        }
      }
    findIndexById(id: string): number {
        return this.products.findIndex((product) => product.id === id);
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
