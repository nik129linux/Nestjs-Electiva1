import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    expirationDate: string;
    category: string;
}

@Controller('products')
export class ProductosController {

    private products: Product[] = [
        { id: 1, name: '1 Leche Entera', price: 10, stock: 10, expirationDate: '2026-08-25', category: 'Lácteos' },
        { id: 2, name: '2 Yogurt Natural', price: 20, stock: 0, expirationDate: '2026-09-01', category: 'Lácteos' },
        { id: 3, name: '3 Queso Blanco', price: 30, stock: 30, expirationDate: '2026-09-15', category: 'Lácteos' },
        { id: 4, name: '4 Manzanas x Kg', price: 40, stock: 0, expirationDate: '2026-10-10', category: 'Frutas' },
        { id: 5, name: '5 Bananos x Kg', price: 50, stock: 50, expirationDate: '2026-08-30', category: 'Frutas' },
        { id: 6, name: '6 Pan Integral', price: 60, stock: 60, expirationDate: '2026-09-02', category: 'Panadería' },
        { id: 7, name: '7 Harina Trigo', price: 70, stock: 0, expirationDate: '2026-12-01', category: 'Panadería' },
        { id: 8, name: '8 Arroz x Kg', price: 80, stock: 80, expirationDate: '2027-03-20', category: 'Granos' },
        { id: 9, name: '9 Frijoles x Kg', price: 90, stock: 15, expirationDate: '2026-07-14', category: 'Granos' },
        { id: 10, name: '10 Aceite Cocina', price: 100, stock: 100, expirationDate: '2027-06-30', category: 'Abarrotes' },
    ];

    @Get('')
    getProducts() {
        return this.products;
    }

    // Nota: 'out-of-stock' y 'expired' deben ir ANTES de ':id'
    @Get('out-of-stock')
    getOutOfStock() {
        return this.products.filter(product => product.stock === 0);
    }

    @Get('expired')
    getExpiredProducts() {
        const today = new Date();
        return this.products.filter(product => new Date(product.expirationDate) < today);
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.products.find(product => product.id === Number(id));
    }

    @Get('category/:category')
    getProductsByCategory(@Param('category') category: string) {
        return this.products.filter(
            product => product.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Crear un producto
    @Post()
    createProduct(@Body() newProduct: Product) {
        const existingProduct = this.products.find(
            product => product.id === Number(newProduct.id)
        );

        if (existingProduct) {
            return { message: 'El producto con ese ID ya existe.' };
        }

        this.products.push({ ...newProduct, id: Number(newProduct.id) });
        return {
            message: 'Producto creado con exito.',
            data: newProduct,
        };
    }

    // Eliminar un producto
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        const position = this.products.findIndex(product => product.id === Number(id));

        if (position === -1) {
            return { message: 'El producto con ese ID no existe.' };
        }

        this.products.splice(position, 1);
        return { message: 'Producto eliminado con exito.' };
    }

    // Actualizar un producto
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() productChanges: Product) {
        const position = this.products.findIndex(product => product.id === Number(id));

        if (position === -1) {
            return { message: 'El producto con ese ID no existe.' };
        }

        const existingProduct = this.products[position];
        const updatedProduct = { ...existingProduct, ...productChanges, id: existingProduct.id };
        this.products[position] = updatedProduct;

        return {
            message: 'Producto actualizado con exito.',
            data: updatedProduct,
        };
    }
}
