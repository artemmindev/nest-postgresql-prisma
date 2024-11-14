import { Body, Controller, Param, Get, Post, Put, Delete } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductService } from "./product.service";

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product | null> {
    return this.productService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() productData: Product): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(@Body() updateData: Product, @Param('id') id: number): Promise<Product> {
    return this.productService.updateProduct(id, updateData)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.deleteProduct(id)
  }
}