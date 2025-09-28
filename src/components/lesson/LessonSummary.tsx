import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Alert, Card, CardContent, Typography } from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";
import VStack from "@/components/layout/v-stack";

interface LessonSummaryProps {
  title: string;
  keyPoints: {
    title: string;
    code?: string;
  };
  commonMistakes: {
    title: string;
    description: string;
  };
  nextSteps: {
    title: string;
    description: string;
  };
}

export default function LessonSummary({
  title,
  keyPoints,
  commonMistakes,
  nextSteps,
}: LessonSummaryProps) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CheckCircleIcon color="success" />
          {title}
        </Typography>

        <Alert severity="success" sx={{ mb: 2 }}>
          <VStack spacing={1}>
            <Typography variant="subtitle2" gutterBottom>
              {keyPoints.title}
            </Typography>
            {keyPoints.code && (
              <CodeHighlight
                code={keyPoints.code}
                language="jsx"
                theme="dark-plus"
              />
            )}
          </VStack>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {commonMistakes.title}
          </Typography>
          <Typography variant="body2">{commonMistakes.description}</Typography>
        </Alert>

        <Alert severity="info">
          <Typography variant="subtitle2" gutterBottom>
            {nextSteps.title}
          </Typography>
          <Typography variant="body2">{nextSteps.description}</Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}
