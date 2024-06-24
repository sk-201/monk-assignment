import React from "react";

const ProductList = () => {
  return (
    <div className="w-full  flex flex-col justify-center items-center bg-red-200  ">
      <div className="flex place-items-start ">
        <p className="">Add Products</p>
      </div>
      <div className="productlist flex">
        <div>
          <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1" cy="7" r="1" fill="black" fill-opacity="0.5" />
            <circle cx="6" cy="7" r="1" fill="black" fill-opacity="0.5" />
            <circle cx="1" cy="1" r="1" fill="black" fill-opacity="0.5" />
            <circle cx="6" cy="1" r="1" fill="black" fill-opacity="0.5" />
            <circle cx="1" cy="13" r="1" fill="black" fill-opacity="0.5" />
            <circle cx="6" cy="13" r="1" fill="black" fill-opacity="0.5" />
          </svg>
        </div>

        <p>1</p>
        <form className="w-64">
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select"
              required
              disabled
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.62312 10.5273L0.229555 14.4936C0.175956 14.8152 0.443949 15.0832 0.711943 14.976L4.62464 13.5824L14.4332 3.77387L11.3781 0.71875L1.62312 10.5273Z"
                  fill="black"
                  fill-opacity="0.2"
                />
              </svg>
            </button>
          </div>
        </form>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add Discount
        </button>
      </div>
      <button
        type="button"
        class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductList;
