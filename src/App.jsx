import Header from "./components/ui/Header";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./components/admin/AdminHome";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";
import { AuthProvider } from "./context/AuthContext";
import CheckerHome from "./components/checker/CheckerHome";
import RequireCheckerAuth from "./components/checker/RequireCheckerAuth";
import AddBus from "./components/admin/AddBus";
import Bus from "./components/admin/Bus";
import { DataProvider } from "./context/DataContext";
import CustomerBus from "./components/Home/CustomerBus";
import BookingForm from "./components/Home/BookingForm";

function App() {
  return (
    <>
      <DataProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/:id" element={<CustomerBus />} />
              <Route
                path="/:id/booking/:selectedSeats"
                element={<BookingForm />}
              />
            </Route>

            <Route path="/admin" element={<RequireAdminAuth />}>
              <Route index element={<AdminHome />} />
              <Route path="add-bus" element={<AddBus />} />
              <Route path="bus/:id" element={<Bus />} />
            </Route>

            <Route path="/checker" element={<RequireCheckerAuth />}>
              <Route index element={<CheckerHome />} />
            </Route>
          </Routes>
        </AuthProvider>
      </DataProvider>
    </>
  );
}

export default App;
