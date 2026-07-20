import { fetchProductById } from "@/db/queries";
import { notFound, redirect } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { ProductInput, UpdateProductById } from "../../actions";


export default async function EditProductPage(props: { 
  params: Promise<{ id: string }>;
}) {

  const { id: productId } = await props.params;

  const product = await fetchProductById(productId)

  if (!product) return notFound();

  const productValues = { // Vienen de antes
    id: product.id,
    name: product.name,
    description: product.description,
    size: product.size,
    capacity: product.capacity,
    price: Number(product.price), 
    imageUrl: product.imageUrl || undefined,
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
      <h1 className="text-3xl font-bold max-w-5xl mx-auto mb-6 px-4">Modify Product</h1>
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
