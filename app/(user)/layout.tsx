// import { getCurrentUser } from "@/features/auth/server/auth.queries";

import { GlassBackground } from "@/components/common/GlassBackground";
import { Header } from "@/components/user/Header";
import { Roboto, Amiri } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"], // Added more weights for "Bold"
  subsets: ["latin"],
  variable: "--font-roboto",
});

const amiri = Amiri({
  weight: ["400", "700"],
  style: ["normal", "italic"], // Explicitly include italics
  subsets: ["latin"],
  variable: "--font-amiri",
});

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className={`${roboto.variable} ${amiri.variable} antialiased`}>
        <Header />
        <GlassBackground opacity={0.9} />
        {children}
      </body>
    </>
  );
}
