"use client";

import { useState } from "react";
import { ProductInput } from "../../../app/(admin)/products/actions";

interface ProductFormProps {
  mode: "create" | "edit" | "delete";
  defaultValues?: ProductInput;
  onSave?: (product: ProductInput) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({
  mode,
  defaultValues,
  onSave,
  onDelete,
  onCancel,
}: ProductFormProps) {
  // Empty values used when creating a brand-new product.
  const emptyProduct: ProductInput = {
    name: "",
    description: "",
    capacity: "",
    price: 0,
    imageUrl: "",
  };

  // Use existing product values in edit/delete mode or else use empty values in create mode.
  const [product, setProduct] = useState<ProductInput>(
    defaultValues ?? emptyProduct,
  );

  const isDeleteMode = mode === "delete";

  // Update the matching product field whenever an input changes.
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setProduct((previousProduct) => ({
      ...previousProduct,

      // Convert price from the input string into a number.
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Save, update, or delete depending on the current form mode.
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDeleteMode) {
      onDelete?.();
      return;
    }

    onSave?.(product);
  };

  // Restore the original values before leaving the page.
  const handleDiscard = () => {
    setProduct(defaultValues ?? emptyProduct);
    onCancel?.();
  };

  // Change the heading depending on what the owner is doing.
  const sectionTitle = {
    create: "Product Information",
    edit: "Edit Product Information",
    delete: "Review Product for Deletion",
  }[mode];

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{sectionTitle}</h2>

        {/* Warning shown only when deleting a product. */}
        {isDeleteMode && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
            <h3 className="font-semibold">Delete Product</h3>

            <p className="mt-2">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6">
          {/* Product/category name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isDeleteMode}
              value={product.name}
              onChange={handleChange}
              placeholder="Example: Single Arrangement"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
            />
          </div>

          {/* Product description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={6}
              required
              disabled={isDeleteMode}
              value={product.description}
              onChange={handleChange}
              placeholder="Describe the arrangement and what is included."
              className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Capacity can be anything the owner enters. */}
            <div>
              <label
                htmlFor="capacity"
                className="mb-2 block text-sm font-medium"
              >
                Capacity
              </label>

              <input
                id="capacity"
                name="capacity"
                type="text"
                required
                disabled={isDeleteMode}
                value={product.capacity}
                onChange={handleChange}
                placeholder="Example: 1 person, 10-20, or 50-plus"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
              />

              <span className="mt-1 block text-sm text-slate-500">
                Enter the number or range of people this product serves.
              </span>
            </div>

            {/* Product price */}
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium">
                Price (USD)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                disabled={isDeleteMode}
                value={product.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
              />

              <span className="mt-1 block text-sm text-slate-500">
                Enter 0 when the price should display as “Upon request.”
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form action buttons */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        {/* Allow deletion from the edit page. */}
        {mode === "edit" && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
          >
            Delete Product
          </button>
        )}

        <div className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
          >
            {isDeleteMode ? "Cancel" : "Discard"}
          </button>

          {isDeleteMode ? (
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
            >
              Confirm Delete
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              {mode === "create" ? "Create Product" : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
