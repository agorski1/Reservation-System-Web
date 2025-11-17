import React, {useState} from "react";
import api from "../utils/api.ts";
import {useNavigate} from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert
} from "@mui/material";
import type {AxiosError} from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", {email, password});
            navigate("/login");
        } catch (e) {
            const err = e as AxiosError<{ message?: string }>;
            setError(err.response?.data?.message || "Error with registration");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{mt: 8, display: "flex", flexDirection: "column", gap: 2}}>
                <Typography variant="h4" align="center">Rejestracja</Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Hasło"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />

                <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
                    Zarejestruj się
                </Button>
                <Typography align="center" sx={{ mt: 2 }}>
                    Posiadasz już konto?{" "}
                    <Link component={RouterLink} to="/login">
                        Zaloguj się
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;