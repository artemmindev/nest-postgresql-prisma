import { PrismaService } from "src/prisma.service";
import { Product } from "./product.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id: Number(id) } })
  }

  async createProduct(data: Product): Promise<Product> {
    return this.prisma.product.create({ data })
  }

  async updateProduct(id: number, data: Product): Promise<Product> {
    const { name, price, description } = data;

    return this.prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, description }
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id: Number(id) } })
  }
}