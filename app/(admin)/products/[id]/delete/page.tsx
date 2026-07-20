import { fetchProductById } from "@/db/queries";
import { notFound, redirect } from "next/navigation";
import { DeleteProductById } from "../../actions";
import ProductForm from "@/components/admin/ProductForm";


export default async function DeleteProductPage(props: { 
  params: Promise<{ id: string }>;
}) {
  
 const { id: productId } = await props.params;
 
   const product = await fetchProductById(productId)
 
   if (!product) return notFound();

  const productValues = {
    id: product.id,
    name: product.name,
    description: product.description,
    size: product.size,
    capacity: product.capacity,
    price: Number(product.price),
    imageUrl: product.imageUrl || undefined,
  };

  const handleDelete = async () => {
    "use server";
    await DeleteProductById(productId);
  };

  const handleCancel = async () => {
    "use server";
    redirect(`/products/${productId}/edit`); // Si cancela, lo devolvemos a edición
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold max-w-5xl mx-auto mb-6 px-4 text-red-600">Danger Zone</h1>
      <ProductForm
        mode="delete"
        defaultValues={productValues}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
}
