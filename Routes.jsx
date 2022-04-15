import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/pages/SignUp/SignUp";
import EditUser from "./components/pages/User/EditUser";
import { PrivateRoute } from "./PrivateRoute";
import Login from "./components/pages/Login/Login";
const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/update" element={<EditUser />} />
        </Route>
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
export default Rotas;
