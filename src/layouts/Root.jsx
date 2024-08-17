import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet} from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const Root = () => {
    const location = useLocation();
    // console.log(location);
   
    useEffect(() =>{
       if (location.pathname === '/'){
           document.title = `VoltEdge - Home`
       }else{
           document.title= `VoltEdge  ${location.pathname.replace("/", "- ")}`
       }if (location.state){
           document.title = location.state
       }
       
    },[location.pathname, location.state])
    return (
        <div className="font-pt">
        <Navbar />
      
        <div className="py-12">
      <Outlet/>
      </div>
      <Footer />
   </div>
     
    );
};

export default Root;