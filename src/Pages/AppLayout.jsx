import { Outlet } from "react-router-dom";
import SegmentsNavLg from "../components/SegmentsNavLg";
import SegmentsNav from "../components/SegmentsNav";

function AppLayout() {
    return (
        <>
        
        <SegmentsNavLg/>
        <main>
            <Outlet />
        </main>
        <footer>
          <SegmentsNav />
        </footer>
      </>
    );
  }
  
  export default AppLayout;