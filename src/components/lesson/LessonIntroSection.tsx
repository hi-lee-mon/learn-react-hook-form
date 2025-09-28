import CodeIcon from "@mui/icons-material/Code";
import { Alert, Card, CardContent, Grid, Typography } from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";

interface LessonIntroSectionProps {
  title: string;
  description: string;
  alertMessage?: string;
  beforeCode: {
    title: string;
    code: string;
  };
  afterCode: {
    title: string;
    code: string;
  };
  benefits?: {
    title: string;
    items: string[];
  };
}

export default function LessonIntroSection({
  title,
  description,
  alertMessage,
  beforeCode,
  afterCode,
  benefits,
}: LessonIntroSectionProps) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CodeIcon color="primary" />
          {title}
        </Typography>

        {alertMessage && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        )}

        <Typography variant="body1" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CodeHighlight
              title={beforeCode.title}
              code={beforeCode.code}
              language="javascript"
              theme="dark-plus"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CodeHighlight
              title={afterCode.title}
              code={afterCode.code}
              language="javascript"
              theme="dark-plus"
            />
          </Grid>
        </Grid>

        {benefits && (
          <Alert
            severity="info"
            sx={{
              mb: 2,
              bgcolor: "#1f2937",
              border: "1px solid #374151",
              "& .MuiAlert-icon": {
                color: "#60a5fa",
              },
            }}
          >
            <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
              <Typography
                component="span"
                sx={{ color: "#34d399", fontWeight: "bold" }}
              >
                {benefits.title}
              </Typography>
              {benefits.items.map((item) => (
                <div key={item}>• {item}</div>
              ))}
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
