import ProductForm from "@/components/admin/ProductForm";
import { redirect } from "next/navigation";
import { CreateProduct } from "../../actions";

export default async function NewProductPage() {

  const handleCancel = async () => {
    "use server";
    redirect("/admin/catalog");
  };


  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold max-w-5xl mx-auto mb-6 px-4">Add Product</h1>
      <ProductForm 
        mode="create"
        onSave={CreateProduct}
        onCancel={handleCancel}
      />
    </div>
  );

}