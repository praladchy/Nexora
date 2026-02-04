import ProductHeader from "./ProductHeader";
import ProductRow from "./ProductRow";

const ProductList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <ProductHeader />
      <ProductRow />
      <ProductRow />
      <ProductRow />
    </div>
  );
};

export default ProductList;
