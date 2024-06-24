import React, { useState } from "react";
import ProductModal from "../ProductsModal";
const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="w-full  flex flex-col justify-center items-center ">
      <div className="flex self-start w-2/3 self-end mb-4 pl-12 mt-28">
        <p className="font-semibold text-base ">Add Products</p>
      </div>
      <div className="mb-8 flex flex-row justify-around w-2/3 items-center px-48">
        <p className="font-semibold text-sm ">Product</p>
        <p className="font-semibold text-sm ">Description</p>
      </div>
      {/* products map */}
      <div className="productlist flex">
        <div className="mt-4 mx-2">
          <img src="./assets/drag.svg" alt="drag-icon" />
        </div>

        <p className="mt-2.5 mx-2 font-normal text-sm">1</p>
        <form className="w-64 mx-3">
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select Product"
              required
              disabled
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
              onClick={handleClick}
            >
              <img src="./assets/edit.svg" alt="edit-icon" />
            </button>
          </div>
        </form>
        <button
          type="button"
          className="focus:outline-none text-white bg-primary font-semibold rounded text-sm px-5 py-2.5 me-2 mb-2  w-36"
        >
          Add Discount
        </button>
      </div>
      <div className="productlist flex">
        <div className="mt-4 mx-2">
          <img src="./assets/drag.svg" alt="drag-icon" />
        </div>

        <p className="mt-2.5 mx-2 font-normal text-sm">1</p>
        <form className="w-64 mx-3">
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select Product"
              required
              disabled
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
              onClick={handleClick}
            >
              <img src="./assets/edit.svg" alt="edit-icon" />
            </button>
          </div>
        </form>
        <button
          type="button"
          className="focus:outline-none text-white bg-primary font-semibold rounded text-sm px-5 py-2.5 me-2 mb-2  w-36"
        >
          Add Discount
        </button>
      </div>
      <div className="productlist flex">
        <div className="mt-4 mx-2">
          <img src="./assets/drag.svg" alt="drag-icon" />
        </div>

        <p className="mt-2.5 mx-2 font-normal text-sm">1</p>
        <form className="w-64 mx-3">
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select Product"
              required
              disabled
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
              onClick={handleClick}
            >
              <img src="./assets/edit.svg" alt="edit-icon" />
            </button>
          </div>
        </form>
        <button
          type="button"
          className="focus:outline-none text-white bg-primary font-semibold rounded text-sm px-5 py-2.5 me-2 mb-2  w-36"
        >
          Add Discount
        </button>
      </div>

      <button
        type="button"
        className="text-primary border border-primary mt-5 font-semibold rounded text-sm px-5 py-2.5 text-center me-2 mb-2 w-48 ml-72 "
      >
        Add Product
      </button>
      {showModal ? <ProductModal handleClick={handleClick} /> : null}
    </div>
  );
};

export default ProductList;
