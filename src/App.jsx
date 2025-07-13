import React from "react";
import {
Routes,
Route,
Navigate,
} from "react-router-dom";
import Navbar from './components/Navbar';
import PublicationListPage from './components/PublicationListPage';
import AddPublicationPage from './components/AddPublicationPage';
import EditPublicationPage from './components/EditPublicationPage';
import LoginPage from './components/Login';
import Footer from './components/Footer';
import ProtectedRoute from "./components/ProtectedRoute";
import GaleriPage from './components/GaleriPage';
import HomePage from './components/HomePage';

export default function App() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen font-sans">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <PublicationListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/add"
            element={
              <ProtectedRoute>
                <AddPublicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/edit/:id"
            element={
              <ProtectedRoute>
                <EditPublicationPage />
              </ProtectedRoute>
            }
          />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}