import {Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from "../router/PrivateRoute"

import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/ContactPage';
import RoomSearchPage from '../pages/RoomSearchPage';
import RoomTypesPage from '../pages/RoomTypesPage';
import RoomTypeDetailsPage from '../pages/RoomTypeDetailsPage';
import ReservationsPage from '../pages/ReservationsPage';
import MyReservationsPage from '../pages/MyReservationsPage';
import CreateReservationPage from '../pages/CreateReservationPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>

            <Route path="/reservations" element={<RoomSearchPage/>}/>
            <Route path="/room-types" element={<RoomTypesPage/>}/>
            <Route path="/room-types/:id" element={<RoomTypeDetailsPage/>}/>

            <Route
                path="/reservations/create/:roomTypeId"
                element={
                    <PrivateRoute>
                        <CreateReservationPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/reservations"
                element={
                    <PrivateRoute>
                        <ReservationsPage/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/my-reservations"
                element={
                    <PrivateRoute>
                        <MyReservationsPage/>
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
}