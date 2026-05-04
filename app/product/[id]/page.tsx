import { notFound } from "next/navigation";
import { productById } from "@/app/lib/products";
import { ProductDetailClient } from "@/app/product/[id]/product-detail-client";

export default async function ProductPage(props: PageProps<"/product/[id]">) {
  const { id } = await props.params;
  const product = productById.get(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
