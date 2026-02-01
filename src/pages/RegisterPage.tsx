import React, { useState } from "react";
import api from "../utils/api.ts";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  InputAdornment,
} from "@mui/material";
import { Phone, Email, Person, Lock } from "@mui/icons-material";
import type { AxiosError } from "axios";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Hasła nie są takie same");
      return;
    }

    if (password.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków");
      return;
    }

    try {
      await api.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Błąd podczas rejestracji");
    }
  };

  return (
      <Container maxWidth="sm">
          <Box
              sx={{
                  mt: { xs: 4, sm: 8 },
                  mb: 6,
                  p: { xs: 3, sm: 5 },
                  borderRadius: 3,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.14)",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  maxWidth: 450,
                  mx: "auto",
              }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          fontWeight={700}
          color="primary.main"
          sx={{ mb: 4 }}
        >
          Rejestracja
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            label="Imię"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Numer telefonu"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            required
            margin="normal"
            placeholder="+48 123 456 789"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Hasło"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            helperText="Minimum 8 znaków"
            FormHelperTextProps={{ sx: { ml: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Potwierdź hasło"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              mt: 4,
              py: 1.6,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: 3,
            }}
          >
            Zarejestruj się
          </Button>

          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            Masz już konto?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              fontWeight={500}
              color="primary.main"
            >
              Zaloguj się
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;