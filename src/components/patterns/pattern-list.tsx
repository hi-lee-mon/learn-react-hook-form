import { Grid, Typography } from "@mui/material";

import PatternCard from "./pattern-card";

import Spacer from "@/components/layout/spacer";

import type { Pattern } from "@/data/patterns";

interface PatternListProps {
  patterns: Pattern[];
  title?: string;
}

export default function PatternList({
  patterns,
  title = "実装パターン",
}: PatternListProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Spacer size={24} />

      <Grid container spacing={3}>
        {patterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            icon={pattern.icon}
            title={pattern.title}
            description={pattern.description}
            href={pattern.href}
            buttonText={pattern.buttonText}
            buttonIcon={pattern.buttonIcon}
            disabled={pattern.disabled}
            difficulty={pattern.difficulty}
          />
        ))}
      </Grid>
    </>
  );
}
