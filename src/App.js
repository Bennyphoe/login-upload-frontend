import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import ProtectedPrivateRoute from "./protectivePages/protected-private-route";
import ProtectedPublicRoute from "./protectivePages/protected-public-route";
import Layout from "./components/Layout";
import ViewSent from "./pages/view-sent";
import ViewReceived from "./pages/view-received";

const routes = (
  <Routes>
    <Route exact path="/" element={<Navigate to="/login" replace />}></Route>
    
    {/* public routes */}
    <Route element={<ProtectedPublicRoute />}>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Route>
  
  

    {/* Private routes */}
    <Route element={<ProtectedPrivateRoute/>}>
      <Route element={<Layout/>}>
        <Route path="home" element={<Home />}></Route>
        <Route path="view/sent" element={<ViewSent />}></Route>
        <Route path="view/received" element={<ViewReceived />}></Route>
      </Route>
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
