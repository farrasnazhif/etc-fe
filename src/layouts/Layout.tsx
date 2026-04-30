import React from "react";
import Navbar from "./navbar";
import Banner from "./banner";
import Footer from "./footer";

export default function Layout({
  withNavbar,
  withBanner,
  withFooter,
  children,
}: {
  withNavbar?: boolean;
  withBanner?: boolean;
  withFooter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main data-theme="light">
      {withBanner && <Banner />}
      {withNavbar && <Navbar />}
      {children}
      {withFooter && <Footer />}
    </main>
  );
}
