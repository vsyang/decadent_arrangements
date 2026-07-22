import ProductForm from "@/components/admin/ProductForm";
import { fetchProductById } from "@/db/queries";
import { notFound, redirect } from "next/navigation";

import { DeleteProductById, ProductInput } from "../../actions";

type DeleteProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const { id: productId } = await params;

  // Retrieve the product that the owner wants to delete.
  const product = await fetchProductById(productId);

  if (!product) {
    notFound();
  }

  // Convert the database result into the values expected by ProductForm.
  const productValues: ProductInput = {
    id: product.id,
    name: product.name,
    description: product.description,
    capacity: product.capacity,
    price: Number(product.price),
    imageUrl: product.imageUrl ?? undefined,
  };

  const handleDelete = async () => {
    "use server";

    await DeleteProductById(productId);
  };

  const handleCancel = async () => {
    "use server";

    redirect(`/products/${productId}`);
  };

  return (
    <div className="py-10">
      <h1 className="mx-auto mb-6 max-w-5xl px-4 text-3xl font-bold">
        Delete Product
      </h1>

      <ProductForm
        mode="delete"
        defaultValues={productValues}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
}
