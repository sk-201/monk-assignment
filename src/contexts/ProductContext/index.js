import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

// Context provider component
export const ProductProvider = ({ children }) => {
  const defaultProduct = [
    {
      id: 1,
      title: "",
      showDiscount: false,
      showVariants: false,
    },
  ];
  const [selectedProducts, setSelectedProducts] = useState(defaultProduct);
  useEffect(() => {
    console.log("s", selectedProducts);
  }, [selectedProducts]);
  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
