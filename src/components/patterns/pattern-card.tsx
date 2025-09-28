import { Card, CardContent, Grid, Typography, Chip } from "@mui/material";

import LinkButton from "@/components/LinkButton";
import HStack from "@/components/layout/h-stack";
import Spacer from "@/components/layout/spacer";

import type { ReactNode } from "react";

interface PatternCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  buttonText: string;
  buttonIcon?: ReactNode;
  disabled?: boolean;
  difficulty: "初級" | "中級" | "上級";
  gridSize?: { xs?: number; md?: number; lg?: number };
}

const getDifficultyColor = (
  difficulty: "初級" | "中級" | "上級",
): "success" | "warning" | "error" => {
  switch (difficulty) {
    case "初級":
      return "success";
    case "中級":
      return "warning";
    case "上級":
      return "error";
    default:
      return "success";
  }
};

export default function PatternCard({
  icon,
  title,
  description,
  href,
  buttonText,
  buttonIcon,
  disabled = false,
  difficulty,
  gridSize = { xs: 12, md: 6, lg: 4 },
}: PatternCardProps) {
  return (
    <Grid size={gridSize}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <HStack spacing={1} sx={{ alignItems: "center" }}>
            {icon}
            <Typography
              variant="h6"
              component="h2"
              color={disabled ? "text.secondary" : "textPrimary"}
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Chip
              label={difficulty}
              size="small"
              color={getDifficultyColor(difficulty)}
              variant="outlined"
            />
          </HStack>

          <Spacer size={16} />

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>

          <Spacer size="auto" />

          <LinkButton
            href={href}
            variant={disabled ? "outlined" : "contained"}
            color={disabled ? "inherit" : "primary"}
            disabled={disabled}
            startIcon={!disabled && buttonIcon ? buttonIcon : undefined}
          >
            {buttonText}
          </LinkButton>
        </CardContent>
      </Card>
    </Grid>
  );
}
