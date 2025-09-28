"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import HStack from "@/components/layout/h-stack";

interface StepContent {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface StepByStepLearningProps {
  title: string;
  steps: string[];
  stepContents: StepContent[];
}

export default function StepByStepLearning({
  title,
  steps,
  stepContents,
}: StepByStepLearningProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const currentStepContent = stepContents[activeStep];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 400 }}>
          {currentStepContent && (
            <>
              <Typography variant="h6" gutterBottom>
                {currentStepContent.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentStepContent.description}
              </Typography>
              {currentStepContent.content}
            </>
          )}
        </Box>

        <HStack sx={{ pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            戻る
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleReset}>最初から</Button>
          ) : (
            <Button onClick={handleNext}>次へ</Button>
          )}
        </HStack>
      </CardContent>
    </Card>
  );
}
