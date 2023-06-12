import Head from "next/head";
import Image from "next/image";
import { Content, Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import TicketList from "@/components/TicketList";
import * as api from "./api";
import Login from "./login";
import { User } from "@/type";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <Layout>
      <>{login ? <TicketList /> : <Login login={login} setLogin={setLogin} />}</>
    </Layout>
  );
}
