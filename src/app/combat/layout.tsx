import CombatHeader from "@/components/combat/CombatHeader";
import MainBackground from "@/components/common/MainBackground";
import MeProvider from "@/providers/MeProvider";

export default function CombatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MeProvider />

      <CombatHeader />
      <MainBackground>{children}</MainBackground>
    </>
  );
}
