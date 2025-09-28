import { Grid, Typography } from "@mui/material";

import StepCard from "./step-card";

import Spacer from "@/components/layout/spacer";

import type { Step } from "@/data/steps";

interface StepListProps {
  steps: Step[];
  title?: string;
}

export default function StepList({
  steps,
  title = "学習ステップ",
}: StepListProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Spacer size={24} />

      <Grid container spacing={3}>
        {steps.map((step) => (
          <StepCard
            key={step.id}
            icon={step.icon}
            title={step.title}
            description={step.description}
            href={step.href}
            buttonText={step.buttonText}
            buttonIcon={step.buttonIcon}
            disabled={step.disabled}
          />
        ))}
      </Grid>
    </>
  );
}
