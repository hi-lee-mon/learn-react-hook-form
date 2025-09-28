import { Container } from "@mui/material";

import Spacer from "@/components/layout/spacer";

interface LessonLayoutProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function LessonLayout({
  children,
  maxWidth = "lg",
}: LessonLayoutProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }}>
      {children}
      <Spacer size={32} />
    </Container>
  );
}
