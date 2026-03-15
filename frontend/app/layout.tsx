 import "./globals.css";
import { Poppins, Lexend, Roboto_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  display: 'swap',
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  preload: true,
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Next OpenNext Issue Test Project",
            "description": "Next OpenNext Issue Test Project",
          })}
        </Script>
        {/* Inline script to handle theme and silence production logs */}
        <Script
          id="app-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // 1. Silence logs in production
                  if ("${process.env.NEXT_PUBLIC_ENVIRONMENT}" === 'prod') {
                    const noop = () => {};
                    console.log = noop;
                    console.debug = noop;
                    console.info = noop;
                    console.warn = noop;
                    // keep console.error
                  }

                  // 2. Theme initialization
                  var theme = localStorage.getItem('theme') || 'system';
                  if (theme === 'system') {
                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', systemTheme);
                  } else {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} ${lexend.variable} ${robotoMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}