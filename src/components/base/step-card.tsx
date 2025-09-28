import { Card, CardContent, Grid, Typography } from "@mui/material";

import LinkButton from "@/components/LinkButton";
import HStack from "@/components/layout/h-stack";
import Spacer from "@/components/layout/spacer";

import type { ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  buttonText: string;
  buttonIcon?: ReactNode;
  disabled?: boolean;
  gridSize?: { xs?: number; md?: number; lg?: number };
}

export default function StepCard({
  icon,
  title,
  description,
  href,
  buttonText,
  buttonIcon,
  disabled = false,
  gridSize = { xs: 12, md: 6, lg: 4 },
}: StepCardProps) {
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
          <HStack spacing={1}>
            {icon}
            <Typography
              variant="h6"
              component="h2"
              color={disabled ? "text.secondary" : "textPrimary"}
            >
              {title}
            </Typography>
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
