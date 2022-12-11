import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import ProtectedPrivateRoute from "./protectivePages/protected-private-route";
import ProtectedPublicRoute from "./protectivePages/protected-public-route";
import Layout from "./components/Layout";

const routes = (
  <Routes>
    <Route path="/">
      {/* public routes */}
      <Route element={<ProtectedPublicRoute />}>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Route>
    
    

      {/* Private routes */}
      <Route element={<ProtectedPrivateRoute/>}>
        <Route element={<Layout/>}>
          <Route path="home" element={<Home />}></Route>
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<NotFound />}></Route>
    </Route>
   
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
