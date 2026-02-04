import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateShopMutation, useGetShopQuery } from "../components/Redux/Shop.apiSlice";

const CreateShop = () => {
  const [shopData]=useCreateShopMutation();
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        city: "",
        state: "",
        // image: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Shop name is required"),
        address: Yup.string().required("Address is required"), 
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
      })}
      onSubmit={async (values, { resetForm }) => {
        try {
          const res = await shopData(values).unwrap();

        //   const res = await axios.post(
        //     "http://localhost:5000/api/shop/create",
        //     values,
        //     { withCredentials: true }
        //   );

          console.log("Shop Created:", res);
          resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <Form className="max-w-lg mx-auto p-6 bg-white shadow rounded space-y-4">
        <h2 className="text-xl font-semibold">Create Shop</h2>

        <div>
          <label>Shop Name</label>
          <Field
            name="name"
            className="border p-2 w-full rounded"
          />
          <ErrorMessage name="name" component="p" className="text-red-500" />
        </div>

        <div>
          <label>Address</label>
          <Field
            name="address"
            className="border p-2 w-full rounded"
          />
          <ErrorMessage name="address" component="p" className="text-red-500" />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label>City</label>
            <Field
              name="city"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="city" component="p" className="text-red-500" />
          </div>

          <div className="w-1/2">
            <label>State</label>
            <Field
              name="state"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="state" component="p" className="text-red-500" />
          </div>
        </div>

        {/* <div>
          <label>Shop Image URL</label>
          <Field
            name="image"
            placeholder="https://image-url.com"
            className="border p-2 w-full rounded"
          />
        </div> */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Shop
        </button>
      </Form>
    </Formik>
  );
};

export default CreateShop;
