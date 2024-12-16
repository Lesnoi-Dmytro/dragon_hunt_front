import MainBackground from "../common/MainBackground";
import HubHeaderSkeleton from "./header/HubHeaderSkeleton";

export default function HubSkeleton() {
  return (
    <>
      <HubHeaderSkeleton />
      <MainBackground>{null}</MainBackground>
    </>
  );
}
