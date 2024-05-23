import { Routes, Route } from "react-router-dom";
import NotFound from "./Website/NotFound";
import ScrollToTop from "../components/ui/ScrollToTop";
import Unauthorized from "./Website/Unauthorized";
import Login from "./Website/Login";
import SignUp from "./Website/SignUp";
import TopNav from "../components/shared/TopNav";
import AuthProvider from "../providers/AuthProvider";
import Home from "./Website/Home/Todo/index";

export default function Index() {
  return (
    <>
      <ScrollToTop />
      <TopNav />
      <Routes>
        <Route index path='/login' element={<Login />} />
        <Route index path='/signup' element={<SignUp />} />
        <Route element={<AuthProvider />}>
          <Route index path='/' element={<Home />} />
        </Route>
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
