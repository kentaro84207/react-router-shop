import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("products/:id", "routes/products.tsx"),
    route("cart", "routes/cart.tsx"),
    route("checkout", "routes/checkout.tsx"),
    ...prefix("checkout", [
      route("confirm", "routes/checkout/confirm.tsx"),
      route("complete", "routes/checkout/complete.tsx"),
    ]),
    route("login", "routes/login.tsx"),
    route("redis-test", "routes/redis-test.tsx"),
    route("todos", "routes/todos.tsx"),
  ]),
  route("cart/:productId/destroy", "routes/cart-destroy.tsx"),
] satisfies RouteConfig;
