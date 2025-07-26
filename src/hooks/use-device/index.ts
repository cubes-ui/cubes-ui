import { useState, useEffect, useCallback } from "react";
import { isBrowser } from "../../utils";

type DeviceState = "Mobile" | "Tablet" | "Desktop";

interface DeviceInfo {
  state: DeviceState;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
const getDeviceType = (): DeviceState => {
  if (
    !(typeof window !== "undefined" && typeof window.document !== "undefined")
  )
    return "Desktop";

  const width = window.innerWidth;

  if (width < 768) return "Mobile";
  if (width < 992) return "Tablet";
  return "Desktop";
};

export const useDevice = (): DeviceInfo => {
  const [state, setState] = useState<DeviceState>(() => getDeviceType());

  const updateDeviceState = useCallback(() => {
    setState(getDeviceType());
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener("resize", updateDeviceState);
    return () => window.removeEventListener("resize", updateDeviceState);
  }, [updateDeviceState]);

  return {
    state,
    isMobile: state === "Mobile",
    isTablet: state === "Tablet",
    isDesktop: state === "Desktop",
  };
};