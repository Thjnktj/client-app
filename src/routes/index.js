import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Detail from "../pages/Product/Detail";

const routes = [
  {
    path: "/",
    title: "Trang chủ",
    exact: true,
    component: Home,
  },
  {
    path: "/store/:slug",
    title: "Cửa hàng",
    exact: true,
    component: Product,
  },
  {
    path: "/detail/:slug",
    title: "Chi tiết",
    exact: true,
    component: Detail,
  },
  {
    path: "/cart",
    title: "Giỏ hàng",
    exact: true,
    component: Cart,
  },
];

export default routes;
