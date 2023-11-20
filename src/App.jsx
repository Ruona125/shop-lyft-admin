import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import ModifyOrder from "./pages/ModifyOrder/ModifyOrder";
import ViewOrder from "./pages/ViewOrder/ViewOrder";
import Wishlists from "./pages/Wishlists/Wishlists";
import ViewProductPage from "./pages/ViewProduct/ViewProductPage";
import ModifyProduct from "./pages/ModifyProduct/ModifyProduct";
import ViewCertainProduct from "./pages/ViewCertainProdcut/ViewCertainProduct";
import CreateProductComponent from "./components/Products/CreateProductComponent/CreateProductComponent";
import ViewUser from "./pages/ViewUser/ViewUser";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/modify-order/:id"
            element={isAuthenticated ? <ModifyOrder /> : <Login />}
          />
          <Route
            path="/orders"
            element={isAuthenticated ? <ViewOrder /> : <Login />}
          />
          <Route
            path="/wishlists"
            element={isAuthenticated ? <Wishlists /> : <Login />}
          />
          <Route
            path="/products"
            element={isAuthenticated ? <ViewProductPage /> : <Login />}
          />
          <Route
            path="/create-product"
            element={isAuthenticated ? <CreateProductComponent /> : <Login />}
          />
          <Route
            path="/modify-product/:id"
            element={isAuthenticated ? <ModifyProduct /> : <Login />}
          />
          <Route
            path="/product/:id"
            element={isAuthenticated ? <ViewCertainProduct /> : <Login />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <ViewUser /> : <Login />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
