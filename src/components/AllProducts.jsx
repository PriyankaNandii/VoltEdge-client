import { useEffect, useState } from "react";
import axios from "axios";
import AllProductsCard from "./AllProductsCard";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const AllProducts = ({ minPrice, maxPrice, onPriceChange }) => {
    const [range, setRange] = useState([minPrice, maxPrice]);

   
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [sortNew, setSortNew] = useState('');
    
    
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-products?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}&sortNew=${sortNew}&brandFilter=${brandFilter}`);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        getData();
    }, [currentPage, filter, itemsPerPage, search, sort, sortNew, brandFilter]);

    useEffect(() => {
        const getCount = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products-count?filter=${filter}&search=${search}&sort=${sort}&sortNew=${sortNew}&brandFilter=${brandFilter}`);
                setCount(data.count)
            } catch (error) {
                console.error("Error fetching product count:", error);
            }
        }
        getCount();
    }, [filter, search, sort, sortNew, brandFilter]);
     
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    };

    const handleReset = () => {
        setFilter('');
        setSort('');
        setSearch('');
        setSearchText('');
        setBrandFilter('');
        
    }

    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText);
    }

    const handleChange = (newRange) => {
        setRange(newRange);
        onPriceChange(newRange);
      };

    return (
      <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
        <div>
          <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
           
            <div>
              <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
                }}
              value={filter}
                name='category'
                id='category'
                className='border p-4 rounded-lg'
              >
                <option value=''>Filter By Category</option>
                <option value='Mobile Devices'>Mobile Devices</option>
                <option value='Computers & Accessories'>Computers & Accessories</option>
                <option value='Cameras & Photography'>Cameras & Photography</option>
                <option value='Gaming'>Gaming</option>
                <option value='Home Appliances'>Home Appliances</option>
                <option value='Smart Home'>Smart Home</option>
                <option value='Mobile Accessories'>Mobile Accessories</option>
              </select>
            </div>

         
            <div>
              <select
              onChange={e => {
                setBrandFilter(e.target.value)
                setCurrentPage(1)
                }}
              value={brandFilter}
                name='brandName'
                id='brandName'
                className='border p-4 rounded-lg'
              >
                <option value=''>Filter By Brand</option>
                <option value='Samsung'>Samsung</option>
                <option value='Apple'>Apple</option>
                <option value='Sony'>Sony</option>
                <option value='Dell'>Dell</option>
                <option value='Bose'>Bose</option>
                <option value='Canon'>Canon</option>
                <option value='Nikon'>Nikon</option>
                <option value='Microsoft'>Microsoft</option>
                <option value='GoPro'>GoPro</option>
                <option value='Dyson'>Dyson</option>
                <option value='LG'>LG</option>
                <option value='Razer'>Razer</option>
                <option value='Google'>Google</option>
                <option value='Asus'>Asus</option>
                <option value='DJI'>DJI</option>
                <option value='Fitbit'>Fitbit</option>
                <option value='Corsair'>Corsair</option>
                <option value='Logitech'>Logitech</option>
                <option value='HP'>HP</option>
                <option value='OnePlus'>OnePlus</option>
                <option value='Lenovo'>Lenovo</option>
                <option value='Amazon'>Amazon</option>
                <option value='Arlo'>Arlo</option>
                <option value='TP-Link'>TP-Link</option>
                <option value='Ring'>Ring</option>
                <option value='Anker'>Anker</option>
              </select>
            </div>
  
  
            {/* Search Product */}
            <form onSubmit={handleSearch}>
              <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                <input
                  className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                  type='text'
                  onChange={e => setSearchText(e.target.value)}
                  value={searchText}
                  name='search'
                  placeholder='Enter Product Name'
                  aria-label='Enter Product Name'
                />
                <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                  Search
                </button>
              </div>
            </form>

            {/* Sort by Price */}
            <div>
              <select
                onChange={e => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                value={sort}
                name='sort'
                id='sort'
                className='border p-4 rounded-md'
              >
                <option value=''>Sort By Price</option>
                <option value='dsc'>Price High to Low</option>
                <option value='asc'>Price Low to High</option>
              </select>
            </div>

            {/* Sort by Date */}
            <div>
              <select
                onChange={e => {
                  setSortNew(e.target.value);
                  setCurrentPage(1);
                }}
                value={sortNew}
                name='sortNew'
                id='sortNew'
                className='border p-4 rounded-md'
              >
                <option value=''>Sort By Date</option>
                <option value='dsc'>Newest Added</option>
              </select>
            </div>
            
            {/* Reset Filters */}
            <button onClick={handleReset} className='btn'>Reset</button>
          </div>

          <div className="price-range-filter">
      <h4>Filter by Price</h4>
      <Slider
        range
        min={minPrice}
        max={maxPrice}
        value={range}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: '#D35400' }]}
        handleStyle={[
          { borderColor: '#D35400' },
          { borderColor: '#D35400' },
        ]}
        railStyle={{ backgroundColor: '#ccc' }}
      />
      <div>
        <span>Min: ${range[0]}</span> - <span>Max: ${range[1]}</span>
      </div>
    </div>

          {/* Display Products */}
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {products.map(product => (
              <AllProductsCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className='flex justify-center mt-12'>
          <button 
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#D35400] hover:text-white'
          >
            <div className='flex items-center -mx-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              <span className='mx-1'>previous</span>
            </div>
          </button>
          {pages.map(number => (
            <button
              onClick={() => handlePaginationButton(number)}
              key={number}
              className={`${currentPage === number ? 'bg-[#D35400] text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 mx-1 capitalize rounded-md  hover:bg-[#D35400] hover:text-white`}
            >
              {number}
            </button>
          ))}
          <button 
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className='px-4 py-2 mx-1 text-gray-700 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#D35400] hover:text-white'
          >
            <div className='flex items-center -mx-1'>
              <span className='mx-1'>Next</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    );
};

export default AllProducts;
