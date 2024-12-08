import MainBackground from "./MainBackground";
import MainHeaderSkeleton from "./navigation/header/MainHeaderSkeleton";

export default function HubSkeleton() {
  return (
    <>
      <MainHeaderSkeleton />
      <MainBackground>{null}</MainBackground>
    </>
  );
}
