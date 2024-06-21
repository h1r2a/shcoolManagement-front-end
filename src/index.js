import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; 
import { AuthProvider } from "./context/AuthContext";


// Configuration des options par défaut de Toastr avec animations
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
  showMethod: 'slideDown', // Animation d'affichage
  hideMethod: 'slideUp', // Animation de disparition
  showDuration: 300, // Durée de l'animation d'affichage en millisecondes
  hideDuration: 300, // Durée de l'animation de disparition en millisecondes
  showEasing: 'swing', // Fonction d'easing pour l'animation d'affichage
  hideEasing: 'linear' // Fonction d'easing pour l'animation de disparition
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter></AuthProvider>
);

reportWebVitals();
