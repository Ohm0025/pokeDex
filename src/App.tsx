// import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./page/home";
import DetailPage from "./page/detail";
import ButtonTheme from "./component/buttonTheme/ButtonTheme";

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
      className={`bg-[url("/image/light-bg.jpg")] dark:bg-[url("/image/dark-bg.jpg")] bg-cover bg-no-repeat bg-center min-h-[100vh] pb-[20px] relative`}>
      <ButtonTheme />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
