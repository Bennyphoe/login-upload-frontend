import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import ProtectedPrivateRoute from "./protectivePages/protected-private-route";
import ProtectedPublicRoute from "./protectivePages/protected-public-route";

const routes = (
  <Routes>
    <Route path="/" element={<ProtectedPublicRoute />}>
      {/* public routes */}
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Route>
    

    {/* Private routes */}
    <Route path="/" element={<ProtectedPrivateRoute/>}>
      <Route path="home" element={<Home />}></Route>
    </Route>
    {/* catch all */}
    <Route path="*" element={<NotFound />}></Route>
   
  </Routes>
)

function App() {
  return (
    <>
      {routes}
    </>
  );
}

export default App;
