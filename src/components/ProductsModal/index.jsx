import React, { useState, useEffect } from "react";
import axios from "axios";
import LazyLoad from "react-lazyload";
import Spinner from "../Spinner";
import debounce from "lodash/debounce";
const ProductModal = ({ handleClick }) => {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const getProductData = async () => {
    try {
      const response = await axios.get(
        `/task/products/search?search=${search}&page=2&limit=1`,
        {
          headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        }
      );
      setProductData(response.data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const handleSearch = (e) => {
    console.log("e", e.target.value);
    setSearch(e.target.value);
  };
  useEffect(() => {
    //implementing debounce logic
    const getData = setTimeout(getProductData, 2000);
    return () => clearTimeout(getData);
  }, [search]);

  return (
    <div>
      <div
        className="relative z-10 o "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity "
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            {productData?.length === 0 ? (
              <div className="transform rounded-lg  bg-white flex justify-center items-center shadow-xl transition-all w-2/3 h-[612px] my-12  ">
                {" "}
                <Spinner />
              </div>
            ) : (
              <div className="relative transform rounded-lg  bg-white text-left shadow-xl transition-all w-2/3  h-screen  my-12   ">
                <div className="bg-white">
                  <p className="font-medium text-lg p-2">Select Products</p>

                  <form className=" my-4  border-lightgray p-2 border-y-2 px-12">
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="#00000066"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        id="default-search"
                        className="block  w-full p-4  ps-10 text-sm text-gray-900  rounded-lg  border border-searchBar outline-none "
                        placeholder="Search Product"
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                  {productData?.map((product) => {
                    return (
                      <div key={product.id}>
                        <div className="flex border-b-2  border-lightgray p-2">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-6 h-6 mx-2 text-primary bg-gray-100  rounded accent-primary"
                          />
                          <LazyLoad height={36} once>
                            <img src={product.image.src} className="w-9 h-9 " />
                          </LazyLoad>

                          <p className="font-normal text-base mx-2">
                            {product.title}
                          </p>
                        </div>
                        {/* variants */}
                        {product?.variants?.map((variant) => {
                          return (
                            <div className="flex border-b-2  border-lightgray p-2 pl-10">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                className="w-6 h-6 mx-2 text-primary bg-gray-100  rounded accent-primary"
                              />
                              <p className="font-normal text-base mx-2 w-2/3 ">
                                {variant.title}
                              </p>

                              <p className="font-normal text-base mx-2 w-28">
                                {variant?.inventory_quantity
                                  ? `${variant.inventory_quantity} Available`
                                  : "NA"}
                              </p>
                              <p className="font-normal text-base mx-2 w-24">
                                ${variant.price}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                    <button
                      type="button"
                      className="inline-flex w-7 justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClick()}
                      className="mt-3 inline-flex w-12 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-darkgray shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
