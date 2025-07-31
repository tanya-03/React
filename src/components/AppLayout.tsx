import { Outlet, useNavigation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "../App.css";
import { Loading } from "./Loading";

export const AppLayout = () => {
  const navigation = useNavigation();
  console.log("navigation", navigation);
  if (navigation.state === "loading") return <Loading />;
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};
