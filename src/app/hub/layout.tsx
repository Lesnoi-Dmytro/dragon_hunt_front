import MainBackground from "@/components/common/MainBackground";
import MainHeader from "@/components/common/navigation/MainHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <MainBackground>{children}</MainBackground>
    </>
  );
}
