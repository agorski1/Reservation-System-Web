import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ReservationsPage from "./pages/ReservationsPage.tsx";
import RoomTypesPage from "./pages/RoomTypesPage.tsx";
import { useAuth } from "./context/AuthContext";
import {JSX} from "react";
import MainLayout from "./layout/MainLayout.tsx";
import RoomTypeDetailsPage from "./pages/RoomTypeDetailsPage.tsx";
import MyReservationsPage from "./pages/MyReservationsPage.tsx";
import RoomSearchPage from "./pages/RoomSearchPage.tsx";
// import MyReservations from "./pages/MyReservations.tsx";

function App() {
    const { token } = useAuth();

    const PrivateRoute = ({ children }: { children: JSX.Element }) => {
        if (!token) return <Navigate to="/login" />;
        return children;
    };

    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/reservations" element={<RoomSearchPage />} />
                    <Route path="/room-types" element={<RoomTypesPage />} />
                    <Route path="/room-types/:id" element={<RoomTypeDetailsPage />} />
                    <Route
                        path="/reservations"
                        element={
                            <PrivateRoute>
                                <ReservationsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my-reservations"
                        element={
                            <PrivateRoute>
                                <MyReservationsPage />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </MainLayout>
        </>
    );
}

export default App;
