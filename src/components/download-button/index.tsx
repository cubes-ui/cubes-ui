import { ReactNode } from "react";
import { Button } from "../button";

export const DownloadButton = ({
  children,
  item,
}: {
  children: ReactNode;
  item: string | URL;
}) => {
  return (
    <Button
      onClick={() => {
        window.open(item, "_self");
      }}
    >
      {children}
    </Button>
  );
};
