import { redirect } from "next/navigation";
import { CreateProduct } from "../actions";
import ProductForm from "@/app/ui/admin/products/ProductForm";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function NewProductPage() {
  const handleCancel = async () => {
    "use server";
    redirect("/products");
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
          Add Product
        </h1>

        <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />
      </section>

      <ProductForm
        mode="create"
        onSave={CreateProduct}
        onCancel={handleCancel}
      />
    </div>
  );
}
