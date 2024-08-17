import { useEffect, useState } from "react";
import axios from "axios"; 
import HomePageProductsCard from "./HomePageProductsCard";

const HomePageProducts = () => {
   const [products, setProducts] = useState([]);
   
   useEffect(() => {
       const getData = async () => {
           try {
               const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
               setProducts(data);
           } catch (error) {
               console.error("Error fetching products:", error);
           }
       }
       getData();
   }, []);

   return (
       <div>
           <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
               {products.slice(0, 9).map(product => (
                   <HomePageProductsCard key={product._id} product={product} />
               ))}
           </div>
           <button className="px-5 py-2 m-5 border-2 border-[#D35400] text-[#D35400] rounded">Show All</button>
       </div>
   );
};

export default HomePageProducts;
