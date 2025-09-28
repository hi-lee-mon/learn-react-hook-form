import { Typography } from "@mui/material";

import VStack from "@/components/layout/v-stack";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <VStack spacing={1}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </VStack>
  );
}
