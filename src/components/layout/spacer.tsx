import { Box, type BoxProps } from "@mui/material";

interface SpacerProps extends Omit<BoxProps, "sx"> {
  size?: number | string;
  direction?: "horizontal" | "vertical";
}

export default function Spacer({
  size = 1,
  direction = "vertical",
  ...props
}: SpacerProps) {
  return (
    <Box
      {...props}
      sx={{
        ...(direction === "vertical"
          ? { height: size, width: "100%" }
          : { width: size, height: "100%" }),
        flexShrink: 0,
      }}
    />
  );
}
