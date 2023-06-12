import React, { ReactNode, useEffect, useState } from "react";

import UserDetail from "@/components/UserDetail";
import Layout from "@/components/layout/Layout";
import NotFound from "@/components/NotFound";
type LayoutProps = {
  children: ReactNode;
};

const Profile = ({ children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("access") ? true : false);
  }, []);
  return <Layout>{isLoggedIn ? <UserDetail /> : <NotFound />}</Layout>;
};

export default Profile;
