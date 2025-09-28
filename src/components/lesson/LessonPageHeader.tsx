import { Typography } from "@mui/material";

import VStack from "@/components/layout/v-stack";

interface LessonPageHeaderProps {
  title: string;
  description: string;
}

export default function LessonPageHeader({
  title,
  description,
}: LessonPageHeaderProps) {
  return (
    <VStack spacing={1}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {description}
      </Typography>
    </VStack>
  );
}
