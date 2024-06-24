import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductsModal";

function App() {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className="w-full h-screen">
      {/* <ProductList /> */}
      <button onClick={handleClick} className="bg-blue-900">
        {show === true ? "Show Modal" : "Close Modal"}
      </button>

      {show === true ? <ProductModal handleClick={handleClick} /> : null}
    </div>
  );
}

export default App;
