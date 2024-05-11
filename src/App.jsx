import Header from "./components/ui/Header";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./components/admin/AdminHome";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/ui/Footer";
import CheckerHome from "./components/checker/CheckerHome";
import RequireCheckerAuth from "./components/checker/RequireCheckerAuth";
function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin" element={<RequireAdminAuth />}>
            <Route index element={<AdminHome />} />
          </Route>

          <Route path="/checker" element={<RequireCheckerAuth />}>
            <Route index element={<CheckerHome />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
