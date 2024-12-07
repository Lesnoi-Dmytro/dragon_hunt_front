import MainHeader from "@/components/common/navigation/MainHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="flex-1">{children}</div>
    </>
  );
}
