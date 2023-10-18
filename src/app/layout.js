"use client";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import React, { useState, useEffect } from "react";

export const WebSocketContext = React.createContext(null);

export default function RootLayout({ children }) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection when the RootLayout is mounted
    if (!ws) {
      const newSocket = new WebSocket("ws://localhost:8080");
      setWs(newSocket);
    } else if (ws) {
      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);

        // Redirect to the error page
        router.push("/error");
      };
    }

    // Close the WebSocket connection when the RootLayout unmounts
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <html lang="en">
      <meta charset="UTF-8"></meta>
      <WebSocketContext.Provider value={ws}>
        <body className={inter.className}>{children}</body>
      </WebSocketContext.Provider>
    </html>
  );
}
