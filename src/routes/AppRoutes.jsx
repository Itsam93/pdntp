import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AvatarPage from "../pages/AvatarPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/avatar/:type"
        element={<AvatarPage />}
      />

    </Routes>
  );
}

export default AppRoutes;