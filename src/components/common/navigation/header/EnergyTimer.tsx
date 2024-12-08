import useUserStore from "@/stores/userStore";
import { useCallback, useEffect, useState } from "react";

export default function EnergyTimer() {
  const recoverAt = useUserStore((store) => store.recoverAt);

  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const getTimeRemaining = useCallback(() => {
    setMinutes(
      Math.max(0, Math.floor((recoverAt.getTime() - Date.now()) / 60000))
    );
    setSeconds(
      Math.max(0, Math.floor((recoverAt.getTime() - Date.now()) / 1000) % 60)
    );
  }, [setMinutes, setSeconds, recoverAt]);

  useEffect(() => {
    getTimeRemaining();

    const interval = setInterval(() => {
      getTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeRemaining]);

  return (
    <>
      {minutes}:{seconds}
    </>
  );
}
