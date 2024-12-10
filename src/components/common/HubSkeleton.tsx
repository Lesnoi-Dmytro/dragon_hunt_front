import MainBackground from "./MainBackground";
import MainHeaderSkeleton from "./navigation/header/HubHeaderSkeleton";

export default function HubSkeleton() {
  return (
    <>
      <MainHeaderSkeleton />
      <MainBackground>{null}</MainBackground>
    </>
  );
}
