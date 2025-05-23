import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app.tsx"
import "./global.css"

const root = document.getElementById("root")

if (!root) {
  throw new Error("Root element not found")
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
