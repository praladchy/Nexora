import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProductImageDropzone  from "../utils/ImageUploader.jsx"
import { useState } from "react";

const AddProduct = () => {
  const initialValues = {


     
    productName: "",
    brand: "",
    category: "",
    shopId: "", // ✅ ADD THIS
    price: "",
    stockLimit: "",
    SKU: "",
    description: "",
    stockLevel: "",
    discount: "",
    images: [],
    
   productType: "",
    // variants: [
    //   {
    //     color: "",
    //     size: "",
    //     sku: "",
    //     price: "",
    //     stock: "",
    //     discount: "",
    //     isDefault: false,
    //   },
    // ],
  };

  const productSchema = Yup.object({
    productName: Yup.string().required("Product name required"),
    category: Yup.string().required("Category required"),
    brand: Yup.string().required("Brand required"),
    price: Yup.number().required("Price required"),
    SKU: Yup.string().required("SKU required"),
    stockLevel: Yup.number().required("Stock level required"),
    stockLimit: Yup.number().required("Stock limit required"),
    discount: Yup.number(),
   productType: Yup.string().required("Select variant type"),
    // variants: Yup.array().of(
    //   Yup.object({
    //     color: Yup.string().required("Color required"),
    //     size: Yup.string().required("Size required"),
    //     sku: Yup.string().required("SKU required"),
    //     price: Yup.number().required("Price required"),
    //     stock: Yup.number().required("Stock required"),
    //     discount: Yup.number(),
    //     isDefault: Yup.boolean(),
    //   })
    // ),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // ✅ Append normal fields
    formData.append("productName", values.productName);
    formData.append("brand", values.brand);
    formData.append("category", values.category);
    formData.append("shopId", values.shopId);
    formData.append("price", values.price);
    formData.append("SKU", values.SKU);
    formData.append("stockLevel", values.stockLevel);
    formData.append("stockLimit", values.stockLimit);
    formData.append("discount", values.discount);
    formData.append("productType", values.productType);
    formData.append("description", values.description);

    formData.append("variants", JSON.stringify(values.variants));

    
   
  };

  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        // validationSchema={productSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex gap-6">
            {/* LEFT */}
            <div className="w-[40%] flex flex-col gap-6">
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-3">Upload Images*</h3>
                <ProductImageDropzone
                  images={values.images}
                  setFieldValue={setFieldValue}
                />
              </div>

              {/* VARIANTS */}
              {/* <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Product Variants</h2>

                <FieldArray name="variants">
                  {({ push, remove }) => (
                    <div className="flex flex-col gap-4">
                      {values.variants.map((_, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-xl shadow flex gap-4"
                        >
                          <div className="flex-1 flex flex-col gap-3">
                            <div className="flex gap-4">
                              <Field
                                name={`variants.${index}.color`}
                                className="input flex-1"
                                placeholder="Color"
                              />
                              <Field
                                name={`variants.${index}.size`}
                                className="input flex-1"
                                placeholder="Size"
                              />
                              <Field
                                name={`variants.${index}.sku`}
                                className="input flex-1"
                                placeholder="SKU"
                              />
                            </div>

                            <div className="flex gap-4">
                              <Field
                                name={`variants.${index}.price`}
                                className="input flex-1"
                                placeholder="Price"
                              />
                              <Field
                                name={`variants.${index}.stock`}
                                className="input flex-1"
                                placeholder="Stock"
                              />
                              <Field
                                name={`variants.${index}.discount`}
                                className="input flex-1"
                                placeholder="Discount %"
                              />
                            </div>

                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 text-sm">
                                <Field
                                  type="checkbox"
                                  name={`variants.${index}.isDefault`}
                                />
                                Default Variant
                              </label>

                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 ml-auto"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          push({
                            color: "",
                            size: "",
                            sku: "",
                            price: "",
                            stock: "",
                            discount: "",
                            isDefault: false,
                          })
                        }
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg self-end"
                      >
                        + Add Variant
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div> */}
            </div>

            {/* RIGHT */}
            <div className="w-[60%] flex flex-col gap-6">
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-4">Basic Information</h3>

                <div className="flex gap-4 mb-4">
                  <Field
                    name="productName"
                    className="input flex-1"
                    placeholder="Product name"
                  />
                  <Field
                    name="category"
                    className="input flex-1"
                    placeholder="Category"
                  />
                </div>

                <div className="flex gap-4 mb-4">
                  <Field
                    name="brand"
                    className="input flex-1"
                    placeholder="Brand"
                  />

                  {/* SHOP SELECT */}
                  {/* <Field as="select" name="shopId" className="input flex-1">
                    <option value="">Select Shop</option>

                    {data?.data?.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Field> */}

                  {/* GENDER */}
                  <Field as="select" name="gender" className="input flex-1">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                </div>

                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="input w-full"
                  placeholder="Description"
                />
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-4">Product Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <Field name="price" className="input" placeholder="Price" />
                  <Field name="SKU" className="input" placeholder="SKU" />
                  <Field
                    name="stockLevel"
                    className="input"
                    placeholder="Stock Level"
                  />
                  <Field
                    name="stockLimit"
                    className="input"
                    placeholder="Stock Limit"
                  />

                  <Field as="select" name="productType" className="input">
                    <option value="">Select Type</option>
                    <option value="simple">Simple</option>
                    <option value="variant">Variant</option>
                  </Field>

                  <Field
                    name="discount"
                    className="input"
                    placeholder="Discount %"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white"
                >
                  Add Product
                </button>

                <button type="button" className="px-6 py-2 rounded-lg border">
                  Save to Draft
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
