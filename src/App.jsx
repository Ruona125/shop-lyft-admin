import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login/Login"
import HomePage from "./pages/Home/HomePage"
import ModifyOrder from "./pages/ModifyOrder/ModifyOrder"
import ViewOrder from "./pages/ViewOrder/ViewOrder"
import Wishlists from "./pages/Wishlists/Wishlists"
import ViewProductPage from "./pages/ViewProduct/ViewProductPage"
import ModifyProduct from "./pages/ModifyProduct/ModifyProduct"
import CreateProduct from "./pages/CreateProduct/CreateProduct"
import ViewCertainProduct from "./pages/ViewCertainProdcut/ViewCertainProduct"

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/modify-order/:id" element={<ModifyOrder />} />
          <Route path="/orders" element={<ViewOrder />} />
          <Route path="/wishlists" element={<Wishlists />} />
          <Route path="/products" element={<ViewProductPage />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/modify-products/:id" element={<ModifyProduct />} />
          <Route path="/product/:id" element={<ViewCertainProduct />} />

        </Routes>
      </div>
    </>
  )
}

export default App
