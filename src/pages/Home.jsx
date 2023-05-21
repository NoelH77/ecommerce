import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { axiosEcommerce } from "../utils/configAxios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [currentCategory, setCurrentCategory] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductName = e.target.productName.value;
    setProductName(newProductName);
  };

  const productsByName = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(productName.toLowerCase())
    );
  }, [products, productName]);

  const handleClickCategory = (e) => {
    setCurrentCategory(Number(e.target.dataset.category));
  };

  useEffect(() => {
    axiosEcommerce
      .get("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentCategory === 0) {
      axiosEcommerce
        .get("products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory !== 0) {
      axiosEcommerce
        .get(`products?categoryId=${currentCategory}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentCategory]);

  return (
    <main className="flex flex-col">
      
      <form onSubmit={handleSubmit} className="p-6 ">
        <div className="flex items-center w-full h-24 md:h-12 md:flex-row md:gap-0 md:justify-center max-[768px]:items-start">
          <input
          className="w-[60%] h-12 border-2 md:h-full outline-0 px-4 max-[520px]:w-[70%]"
            id="productName"
            type="text"
            placeholder="What are you looking for?"
          />
          <button className="bg-red-500 hover:bg-red-600 md:h-full text-white max-w-max px-10 py-2 h-12">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>

      <aside className="ml-10">
      <div className="w-auto">
        <ul className="flex gap-4 justify-center max-[520px]:pr-10">
          <li className="cursor-pointer bg-red-500 p-4 text-white font-bold hover:bg-red-700 max-[520px]:text-sm max-[520px]:p-2" onClick={handleClickCategory} data-category={0} >
            All
          </li>
          {categories.map((category) => (
            <li
              className="cursor-pointer bg-red-500 p-4 text-center rounded-md font-bold text-white hover:bg-red-700 max-[520px]:p-2"
              onClick={handleClickCategory}
              data-category={category.id}
              key={category.id}
            >
              {category.name}
            </li>
          ))}
        </ul>
        </div>
      </aside>

      <section className="grid gap-12 px-10 lg:max-w-[1000px] mx-auto 
        auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] py-4 
        grid-cols">
        {productsByName.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Home;
