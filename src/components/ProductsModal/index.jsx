import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import LazyLoad from "react-lazyload";
import Spinner from "../Spinner";
import { ProductContext } from "../../contexts/ProductContext";
const ProductModal = ({ handleClick }) => {
  const { setSelectedProducts } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");

  //Calling Api for products
  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/task/products/search?search=${search}&page=${currentPage}&limit=10`,
        {
          headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        }
      );
      if (response.data.length !== 0) {
        setProductData(response.data);
        setCurrentPage((prevPage) => prevPage + 1);
      }
      setLoading(false);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  // Handling Search Input
  const handleSearch = (e) => {
    if (search === "") {
      setCurrentPage(1);
    }
    setSearch(e.target.value);
  };

  //Handling check functionality for products as well as variants
  const handleCheck = (id, variant = false) => {
    setSelectedId((prevIds) => {
      if (variant) {
        const element = document.getElementsByClassName(
          `variant-checkbox-${id}`
        );
        const productCheckbox = document.getElementsByClassName(
          `def-checkbox-${id}`
        );

        for (let i = 0; i < element.length; i++) {
          if (productCheckbox[0].checked) {
            element[i].checked = true;
          } else {
            element[i].checked = false;
          }
        }

        const product = productData.find((product) => product.id === id);
        if (!product) return prevIds;

        const variantIds = product.variants.map((variant) => variant.id);

        const newIds = variantIds.filter(
          (variantId) => !prevIds.includes(variantId)
        );

        const updatedIds = prevIds.filter(
          (prevId) => !variantIds.includes(prevId)
        );

        // handleVerifyVariantCheck(id);

        return [...updatedIds, ...newIds];
      } else {
        if (prevIds.includes(id)) {
          return prevIds.filter((productId) => productId !== id);
        } else {
          return [...prevIds, id];
        }
      }
    });
  };
  //Handling logic after user clicks on Add product
  const handleAdd = () => {
    if (selectedId.length === 0) {
      return;
    }
    const addedProducts = productData
      .filter((product) => {
        return (
          selectedId.includes(product.id) ||
          product.variants.some((variant) => selectedId.includes(variant.id))
        );
      })
      .map((product) => ({
        id: product.id,
        title: product.title,
        showDiscount: false,
        showVariants: false,
        variants: product.variants
          .filter((variant) => selectedId.includes(variant.id))
          .map((variant) => ({
            id: variant.id,
            title: variant.title,
            showDiscount: false,
          })),
      }));
    setSelectedProducts((prev) => {
      const filteredPrevProducts = prev.filter((product) => product.title);

      return [...filteredPrevProducts, ...addedProducts];
    });
    setSelectedId([]);
    handleClick();
  };
  //using debounce functionality to minimise api calls
  useEffect(() => {
    const getData = setTimeout(getProductData, 2000);
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // Infinite loading if the user scrolls to the end
  useEffect(() => {
    const modal = document.querySelector(".bg-white.overflow-y-auto");
    modal.addEventListener("scroll", () => {
      if (modal.scrollTop + modal.clientHeight === modal.scrollHeight) {
        getProductData();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div
        className="relative z-10 overflow-y-auto "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity overflow-y-auto  "
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen  overflow-y-auto  ">
          <div className="flex min-h-full items-end   justify-center p-4 text-center sm:items-center sm:p-0  overflow-y-auto">
            {loading === true || productData?.length === 0 ? (
              <div className="transform rounded-lg  bg-white flex justify-center items-center shadow-xl transition-all w-2/3 h-screen my-12 overflow-y-auto ">
                {" "}
                <Spinner />
              </div>
            ) : (
              <div className="relative transform rounded-lg  bg-white text-left shadow-xl transition-all w-2/3  h-[612px]  my-12 overflow-y-auto ">
                <div className="bg-white overflow-y-auto">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-lg p-2">Select Products</p>
                    <img
                      className="cursor-pointer mx-2"
                      src="./assets/close.svg"
                      alt="close icon"
                      onClick={handleClick}
                    />
                  </div>
                  <form className=" my-4  border-lightgray p-2 border-y-2 px-12">
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <img
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          src="./assets/search.svg"
                          alt="search-icon"
                        />
                      </div>
                      <input
                        id="default-search"
                        className="block  w-full p-4  ps-10 text-sm text-gray-900  rounded-lg  border border-searchBar outline-none "
                        placeholder="Search Product"
                        value={search}
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                  {/* Mapping of products */}
                  {productData?.map((product) => {
                    return (
                      <div key={product.id}>
                        <div className="flex border-b-2  border-lightgray p-2">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            onClick={() => handleCheck(product.id, true)}
                            className={`w-6 h-6 mx-2 text-primary bg-gray-100  rounded accent-primary def-checkbox-${product.id}`}
                          />
                          {/* Lazyloading Images for better performance */}
                          <LazyLoad height={36} once>
                            <img
                              src={product.image.src}
                              className="w-9 h-9 "
                              alt={`${product.title}-image`}
                            />
                          </LazyLoad>

                          <p className="font-normal text-base mx-2">
                            {product.title}
                          </p>
                        </div>
                        {/*Mapping  variants  */}
                        {product?.variants?.map((variant) => {
                          return (
                            <div
                              className="flex border-b-2  border-lightgray p-2 pl-10"
                              key={variant.id}
                            >
                              <input
                                id="variant-checkbox"
                                type="checkbox"
                                value=""
                                onClick={() => handleCheck(variant.id)}
                                className={`w-6 h-6 mx-2 text-primary bg-gray-100  rounded accent-primary variant-checkbox-${variant.product_id}`}
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

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6   mb-24  ">
                    <button
                      type="button"
                      className="inline-block w-7 justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClick()}
                      className="mt-3 inline-block w-12 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-darkgray shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
