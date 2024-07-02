import React, { useState, useContext } from "react";
import ProductModal from "../ProductsModal";
import { ProductContext } from "../../contexts/ProductContext";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
const ProductList = () => {
  const [showModal, setShowModal] = useState(false);

  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const onSortEnd = (oldIndex, newIndex) => {
    setSelectedProducts((array) =>
      arrayMoveImmutable(array, oldIndex, newIndex)
    );
  };
  //handling modal state
  const handleClick = () => {
    setShowModal(!showModal);
  };
  //adds a empty product at the end
  const handleAddNewProduct = () => {
    let newObject = {
      id: selectedProducts.length + 1,
      title: "",
      showDiscount: false,
    };
    setSelectedProducts((products) => [...products, newObject]);
  };
  //hadnling the showDiscount functionality
  const handleShowDiscount = (productId, variant = false) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (variant) {
          // If variant is true, update variants array
          const updatedVariants = product.variants.map((variantItem) => {
            if (productId === variantItem.id) {
              console.log("called");
              return {
                ...variantItem,
                showDiscount: !variantItem.showDiscount,
              };
            }
            return variantItem;
          });

          // Return updated product with updated variants array
          return { ...product, variants: updatedVariants };
        } else if (productId === product.id) {
          // If variant is false, update main product
          return { ...product, showDiscount: true };
        }
        return product;
      })
    );
  };

  const handleShowVariants = (productId) => {
    if (selectedProducts[0].title === "") {
      return;
    }

    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (productId === product.id) {
          return { ...product, showVariants: !product.showVariants };
        }
        return product;
      })
    );
  };
  return (
    <div className="w-full  flex flex-col justify-center items-center ">
      <div className="flex self-start w-2/3 self-end mb-4 pl-12 mt-28">
        <p className="font-semibold text-base ">Add Products</p>
      </div>
      <div className="mb-8 flex flex-row justify-around w-2/3 items-center px-48">
        <p className="font-semibold text-sm ">Product</p>
        <p className="font-semibold text-sm ">Discount</p>
      </div>
      {/* Mapping products */}
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {selectedProducts?.map((selectedProduct, ind) => {
          return (
            <SortableItem key={selectedProduct.id}>
              <div className="flex flex-col">
                <div className="productlist flex">
                  <div className="mt-4 mx-2">
                    <img src="./assets/drag.svg" alt="drag-icon" />
                  </div>

                  <p className="mt-2.5 mx-2 font-normal text-sm">{ind + 1}</p>
                  <form className="w-64 mb-2 mx-3 ">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="voice-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={
                          selectedProduct.title !== ""
                            ? selectedProduct.title
                            : "Select Product"
                        }
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

                  {selectedProduct.showDiscount === true ? (
                    <div className="w-48 flex justify-between mb-2 ">
                      <input
                        type="text"
                        id="product-quantity"
                        className=" w-16  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  text-center  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <form className="max-w-sm mx-auto">
                        <select
                          id="countries"
                          className="bg-gray-50 text-gray-900 text-sm rounded-lg  border border-gray-300  block w-full outline-none p-2.5 dark:bg-gray-700 "
                        >
                          <option value="%">%off</option>
                          <option value="flat">flat off</option>
                        </select>
                      </form>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleShowDiscount(selectedProduct.id)}
                      className="focus:outline-none text-white bg-primary font-semibold rounded text-sm px-5 py-2.5 me-2 mb-2  w-48 h-[42px]"
                    >
                      Add Discount
                    </button>
                  )}
                </div>
                <div className="flex flex-col ">
                  <div
                    className="justify-end self-end mr-16 mb-4 fl w-32 flex flex-row justify-around cursor-pointer "
                    onClick={() => handleShowVariants(selectedProduct.id)}
                  >
                    <p className="text-sm text-blue font-normal underline">
                      {selectedProduct.showVariants
                        ? "Hide Variants"
                        : "Show Variants"}
                    </p>
                    <img
                      src={
                        selectedProduct.showVariants
                          ? "./assets/up.svg"
                          : "./assets/down.svg"
                      }
                      alt="chevron-icon"
                      className="pt-1"
                    />
                  </div>

                  {selectedProduct.showVariants === true
                    ? selectedProduct.variants.map((variant, index) => {
                        return (
                          <SortableItem key={variant.id}>
                            <div className="productlist flex ml-16">
                              <div className="mt-4 mx-2">
                                <img src="./assets/drag.svg" alt="drag-icon" />
                              </div>

                              <p className="mt-2.5 mx-2 font-normal text-sm">
                                {index + 1}
                              </p>
                              <form className="w-64 mb-2 mx-3 ">
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    id="voice-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={
                                      variant.title !== ""
                                        ? variant.title
                                        : "Select Product"
                                    }
                                    required
                                    disabled
                                  />
                                  <button
                                    type="button"
                                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                                    // onClick={handleClick}
                                  >
                                    <img
                                      src="./assets/edit.svg"
                                      alt="edit-icon"
                                    />
                                  </button>
                                </div>
                              </form>

                              {variant.showDiscount === true ? (
                                <div className="w-48 flex justify-between mb-2 ">
                                  <input
                                    type="text"
                                    id="product-quantity"
                                    className=" w-16  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  text-center  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                  <form className="max-w-sm mx-auto">
                                    <select
                                      id="countries"
                                      className="bg-gray-50 text-gray-900 text-sm rounded-lg  border border-gray-300  block w-full outline-none p-2.5 dark:bg-gray-700 "
                                    >
                                      <option value="%">%off</option>
                                      <option value="flat">flat off</option>
                                    </select>
                                  </form>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleShowDiscount(variant.id, true)
                                  }
                                  className="focus:outline-none text-white bg-primary font-semibold rounded text-sm px-5 py-2.5 me-2 mb-2  w-48 h-[42px]"
                                >
                                  Add Discount
                                </button>
                              )}
                            </div>
                          </SortableItem>
                        );
                      })
                    : null}
                </div>
              </div>
            </SortableItem>
          );
        })}
      </SortableList>

      <button
        type="button"
        className="text-primary border border-primary mt-5 font-semibold rounded text-sm px-5 py-2.5 text-center me-2 mb-2 w-48 ml-72 "
        onClick={handleAddNewProduct}
      >
        Add Product
      </button>
      {showModal ? <ProductModal handleClick={handleClick} /> : null}
    </div>
  );
};

export default ProductList;
