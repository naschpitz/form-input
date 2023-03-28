import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App.jsx"

import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

const domNode = document.getElementById("root")
const root = createRoot(domNode)

root.render(<App />)
