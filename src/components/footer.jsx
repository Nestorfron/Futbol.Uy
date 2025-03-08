import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background/80 text-center text-xs text-gray-400 py-4">
      <p className="text-center">
        <span className="text-gray-400">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </span>
      </p>
    </footer>
  );
}