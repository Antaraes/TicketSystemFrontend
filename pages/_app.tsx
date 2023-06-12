import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { TicketContextProvider } from "@/context/Ticket";
import { IsAdminContextProvider } from "@/context/IsAdmin";
export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <IsAdminContextProvider>
        <TicketContextProvider>
          <Component {...pageProps} />
        </TicketContextProvider>
      </IsAdminContextProvider>
    </Provider>
  );
}
