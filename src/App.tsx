// import "./App.css";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import HomePage from "./page/home";
import DetailPage from "./page/detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/detail/:name",
      element: <DetailPage />,
    },
  ]);

  return (
    <div
      className={`bg-[url("/image/home-bg.jpg")] bg-cover bg-no-repeat bg-center min-h-[100vh] pb-[20px]`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
