import { Stack, type StackProps } from "@mui/material";

export default function HStack(props: StackProps) {
  return (
    <Stack {...props} sx={{ flexDirection: "row", alignItems: "center" }} />
  );
}
