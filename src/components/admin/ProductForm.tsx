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

    const emptyProduct: ProductInput = { // Product vacio para Limpiar la form al crear
      name: "",
      description: "",
      size: "S",
      capacity: "",
      price: 0,
      imageUrl: "",
    };


    const [product, setProduct] = useState<ProductInput>(
      defaultValues ?? emptyProduct // Comparación en caso que el mode sea par editar
    );


    const isDeleteMode = mode === "delete"; // Caso de delete para poner en dissable los input

    const handleChange = ( // When the user cambie algo
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> // El event Funciona en tipos distintos de input (Pa' orders)
    ) => {
        const { name, value } = e.target; // Obtiende la info
        setProduct(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value, // Para que el precio sea un numero
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isDeleteMode) {
            onDelete?.();
        } else {
            onSave?.(product);
        }
    };

    const handleDiscard = () => { // Ahora para cancelar cambios por arrepentimiento

        setProduct(defaultValues ?? emptyProduct); // Si hay valores (editando) write them. Else ponlo vacio y vea para otro lado

        onCancel?.();
    };

    const sectionTitle = { // Tendra names distintos para el title dependiendo de modo. Evatar confusiones.
        create: "Product Information",
        edit: "Edit Product Information",
        delete: "Review Product for Deletion"
    }[mode];



    return (

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8" >


            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-slate-900">
                    {sectionTitle}
                </h2>

                {/* Message for Delete */}
                {isDeleteMode && (

                    <div className="rounded-lg bg-red-50 border border-red-200 p-5 text-red-700">

                        <h3 className="font-semibold">
                            Delete Product
                        </h3>

                        <p className="mt-2">
                            Are you sure you want to delete this product?
                            This action cannot be undone.
                        </p>

                    </div>

                )}


                <div className="mt-6 grid grid-cols-1 gap-6">


                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Product Name
                        </label>

                        <input
                            name="name"
                            type="text"
                            required
                            disabled={isDeleteMode}
                            value={product.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
                        />

                    </div>


                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows={6}
                            required
                            disabled={isDeleteMode}
                            value={product.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
                        />

                    </div>


                    <div className="grid md:grid-cols-3 gap-6">

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Size
                            </label>

                            <select
                                name="size"
                                disabled={isDeleteMode}
                                value={product.size}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
                            >

                                <option value="S">Small</option>

                                <option value="M">Medium</option>

                                <option value="L">Large</option>

                                <option value="XL">Extra Large</option>

                            </select>

                        </div>


                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Capacity
                            </label>

                            <input
                                name="capacity"
                                type="text"
                                required
                                disabled={isDeleteMode}
                                value={product.capacity}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
                            />

                            <span className="text-sm text-slate-500">people</span>

                        </div>


                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Price (USD)
                            </label>

                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                disabled={isDeleteMode}
                                value={product.price}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 disabled:bg-slate-100"
                            />

                        </div>


                    </div>


                </div>


            </section>

            


            <div className="flex items-center justify-between border-t border-slate-200 pt-6">


                {mode === "edit" && ( // Un atajo por si quiere deletear mientras edita

                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
                    >
                        Delete Product
                    </button>
                )}


                <div className="flex gap-3 ml-auto">


                    <button
                        type="button"
                        onClick={handleDiscard}
                        className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
                    >
                        {isDeleteMode
                            ? "Cancel"
                            : "Discard"
                        }
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
                                {
                                    mode === "create"
                                        ? "Create Product"
                                        : "Save Changes"
                                }
                                
                            </button>
                        )
                    }
                </div>
            </div>
        </form>
    );
}