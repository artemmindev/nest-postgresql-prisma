import { Prisma } from "@prisma/client";

export class Product implements Prisma.ProductCreateInput {
  id: number;
  name: string;
  price: number;
  description?: string;
}