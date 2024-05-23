import { Route, Routes } from "react-router-dom";
import Home from "../Website/Home";
import TopNav from "../../components/shared/TopNav";

export default function Layout() {
  return (
    <div className='flex'>
      <div className='w-full overflow-hidden'>
        <TopNav />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
