import { Route, Routes } from "react-router-dom"
import { Index } from "./pages"
import { Learn } from "./pages/Learn"
import { Shopcart } from "./pages/Shopcart"
import { Home } from "./pages/Home"
import { About } from "./pages/About"

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/store" element={<Shopcart />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )  
}

export default App
