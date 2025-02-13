import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import { NotificationProvider } from "../components/Notifications/NotificationContext";

export default function Layout() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <ModalProvider>
        <NotificationProvider>
          <Modal />
          <Navigation />
          <main className="flex-grow">
            {isLoaded && <Outlet />}
          </main>
          <Footer />
        </NotificationProvider>
      </ModalProvider>
    </div>
  );
}
