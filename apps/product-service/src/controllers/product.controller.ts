import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  const { portions } = data;
  if (!portions || !Array.isArray(portions) || portions.length === 0) {
    return res.status(400).json({ message: " Portion array is required!" });
  }

  const hasInvalidPortion = portions.some(
    (portion) =>
      !portion ||
      typeof portion !== "object" ||
      Array.isArray(portion) ||
      !("name" in portion) ||
      !("price" in portion) ||
      typeof portion.name !== "string" ||
      portion.name.trim().length === 0 ||
      typeof portion.price !== "number" ||
      !Number.isFinite(portion.price) ||
      portion.price < 0,
  );

  if (hasInvalidPortion) {
    return res.status(400).json({
      message: "Each portion must include a name and a non-negative price!",
    });
  }

  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};
export const updateProduct = async (req: Request, res: Response) => {};

export const deleteProduct = async (req: Request, res: Response) => {};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const where: Prisma.ProductWhereInput = {};
  if (typeof category === "string" && category.trim()) {
    where.category = { slug: category };
  }
  if (typeof search === "string" && search.trim()) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const isPriceSort = sort === "asc" || sort === "desc";
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "oldest" ? { createdAt: Prisma.SortOrder.asc } : { createdAt: Prisma.SortOrder.desc };

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  if (isPriceSort) {
    products.sort((firstProduct, secondProduct) => {
      const firstPrice = getFirstPortionPrice(firstProduct.portions);
      const secondPrice = getFirstPortionPrice(secondProduct.portions);
      return sort === "asc" ? firstPrice - secondPrice : secondPrice - firstPrice;
    });
  }

  const parsedLimit = typeof limit === "string" ? Number(limit) : undefined;
  const limitedProducts =
    parsedLimit && Number.isInteger(parsedLimit) && parsedLimit > 0
      ? products.slice(0, parsedLimit)
      : products;

  res.status(200).json(limitedProducts);
};

const getFirstPortionPrice = (portions: Prisma.JsonValue): number => {
  if (!Array.isArray(portions)) return 0;

  const price = (portions[0] as { price?: unknown } | undefined)?.price;
  return typeof price === "number" && Number.isFinite(price) ? price : 0;
};
export const getProduct = async (req: Request, res: Response) => {};
