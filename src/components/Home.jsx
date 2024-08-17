import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Counter from "./Counter";
import Features from "./Features";
import TrendingArticles from "./TrendingArticles";
import SubscriptionModal from "./Modal/SubscriptionModal"; // Ensure the path is correct
import useRole from "../hook/useRole";
import Subscription from "./Subscription";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role] = useRole();

  useEffect(() => {
    if (role === "guest") {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [role]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Banner />
      <Features />
      <AboutUs />
      <Counter />
      <Subscription />
      <TrendingArticles />
      {role === "guest" && (
        <SubscriptionModal isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
