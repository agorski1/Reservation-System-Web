import { AuthProvider } from "./context/AuthContext.tsx";
import AppRoutes from "./router/AppRoutes.tsx";
import MainLayout from "./layout/MainLayout.tsx";

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </AuthProvider>
  );
}

export default App;