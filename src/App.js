import ProductList from "./components/ProductList";
import { ProductProvider } from "./contexts/ProductContext";

function App() {
  return (
    <ProductProvider>
      <div className="w-full h-screen">
        <ProductList />
      </div>
    </ProductProvider>
  );
}

export default App;
