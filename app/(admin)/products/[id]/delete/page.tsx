import "@/app/globals.css";

import { fetchProductById } from "@/app/db/queries";
import { notFound, redirect } from "next/navigation";

import ProductForm from "@/app/ui/admin/products/ProductForm";
import { DeleteProductById, ProductInput } from "../../actions";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <section className="relative px-6 py-5 sm:px-10 lg:py-7">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
          Management Catalog
        </p>

        <h1
          className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
        >
          Delete Product
        </h1>

        <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />
      </section>

      <ProductForm
        mode="delete"
        defaultValues={productValues}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
}
