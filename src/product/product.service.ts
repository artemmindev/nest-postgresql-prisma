import { PrismaService } from "src/prisma.service";
import { Product } from "./product.model";
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  private async findProduct(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id},
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} does not exist`);
    }
    return product;
  }

  private async productExists(name: string, price: number, description: string): Promise<boolean> {
    const existingProduct = await this.prisma.product.findFirst({
      where: { name, price, description },
    });
    return !!existingProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product> {
    return this.findProduct(id)
  }

  async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    const productExists = await this.productExists(data.name, data.price, data.description);
    if (productExists) {
      throw new ConflictException('Product with the same name, price, and description already exists');
    }

    return this.prisma.product.create({ data })
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    await this.findProduct(id);

    if (data.id) {
      throw new ConflictException('Product ID cannot be updated');
    }

    return this.prisma.product.update({
      where: { id },
      data
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    await this.findProduct(id);

    return this.prisma.product.delete({ where: { id } })
  }
}