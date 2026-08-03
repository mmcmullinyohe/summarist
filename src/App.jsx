import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import Book from "./pages/Book";
import Player from "./pages/Player";
import ChoosePlan from "./pages/ChoosePlan";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/choose-plan" element={<ChoosePlan />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;