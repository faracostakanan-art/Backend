import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import IdentifierStep from "./pages/IdentifierStep";
import PasswordStep from "./pages/PasswordStep";
import PersonalInfoStep from "./pages/PersonalInfoStep";
import FinalConfirmation from "./pages/FinalConfirmation";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<IdentifierStep />} />
              <Route path="/password-step" element={<PasswordStep />} />
              <Route path="/personal-info-step" element={<PersonalInfoStep />} />
              <Route path="/final-confirmation" element={<FinalConfirmation />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
