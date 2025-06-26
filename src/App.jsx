import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <AppRoutes />
    </>
  );
}
