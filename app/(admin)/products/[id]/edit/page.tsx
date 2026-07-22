import ProductForm from "@/components/admin/ProductForm";
import { fetchProductById } from "@/db/queries";
import { notFound, redirect } from "next/navigation";

import { ProductInput, UpdateProductById } from "../../actions";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id: productId } = await params;

  const product = await fetchProductById(productId);

  if (!product) {
    notFound();
  }

  const productValues: ProductInput = {
    id: product.id,
    name: product.name,
    description: product.description,
    capacity: product.capacity,
    price: Number(product.price),
    imageUrl: product.imageUrl ?? undefined,
  };

  const handleSave = async (data: ProductInput) => {
    "use server";

    await UpdateProductById(productId, data);
  };

  const handleDeleteRedirect = async () => {
    "use server";

    redirect(`/products/${productId}/delete`);
  };

  const handleCancel = async () => {
    "use server";

    redirect("/products");
  };

  return (
    <div className="py-10">
      <h1 className="mx-auto mb-6 max-w-5xl px-4 text-3xl font-bold">
        Modify Product
      </h1>

      <ProductForm
        mode="edit"
        defaultValues={productValues}
        onSave={handleSave}
        onDelete={handleDeleteRedirect}
        onCancel={handleCancel}
      />
    </div>
  );
}
