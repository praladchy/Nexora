import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navBar/Navbar";
import CategorySlider from "../components/CategorySlider/CategorySlider";
import HeroSectionSlider from "../components/CategorySlider/HeroSectionSlider";
import SubcategorySlider from "../components/CategorySlider/SubcategorySlider";
import ProductList from "../components/product/ProductList";

const Home = () => {
  // const {user}=useSelector((state)=>state.user.data)
  // console.log(user)
  // const userData=localStorage.getItem("userData")
  // console.log(selector)
  return (
    <>
      {/* <Navbar/>  */}
      <HeroSectionSlider />

      <CategorySlider />
      <ProductList />
    </>
    // <div>
    //   {selector? (
    //     <h1 className="text-3xl font-bold underline">
    //       Welcome, {user?.name}!
    //     </h1>
    //   ) : (
    //     <h1 className="text-3xl font-bold underline">Welcome, Guest!</h1>
    //   )}
    // </div>
  );
};

export default Home;
