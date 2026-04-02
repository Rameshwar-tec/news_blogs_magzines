import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/magazines.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollToTop from "../components/common/ScrollToTop";
import Script from "next/script";
import { Inter, Merriweather } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
  display: "swap",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <div
      className={`${inter.variable} ${merriweather.variable}`}
      style={{ background: "#f6f3ec", color: "#1d2430", minHeight: "100vh" }}
    >
      <QueryClientProvider client={queryClient}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JVLEYSXEX7"
          strategy="afterInteractive"
        />
        <Script
          id="ga-jvleysxex7"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JVLEYSXEX7');
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CFTSB5X8JY"
          strategy="afterInteractive"
        />
        <Script
          id="ga-cftsb5x8jy"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CFTSB5X8JY');
            `,
          }}
        />
        <Component {...pageProps} />
        <ScrollToTop />
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
