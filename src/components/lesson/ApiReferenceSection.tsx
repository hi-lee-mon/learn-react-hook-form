import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";
import VStack from "@/components/layout/v-stack";

interface ApiReference {
  title: string;
  description: string;
  level: "基本" | "中級" | "上級";
  code: string;
}

interface ApiReferenceSectionProps {
  title: string;
  references: ApiReference[];
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "基本":
      return "primary";
    case "中級":
      return "secondary";
    case "上級":
      return "error";
    default:
      return "default";
  }
};

export default function ApiReferenceSection({
  title,
  references,
}: ApiReferenceSectionProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        {references.map((reference) => (
          <Accordion key={reference.title}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{reference.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VStack spacing={2}>
                <VStack spacing={1}>
                  <Chip
                    label={reference.level}
                    color={getLevelColor(reference.level)}
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Typography variant="body2">
                    {reference.description}
                  </Typography>
                </VStack>
                <CodeHighlight
                  code={reference.code}
                  language="javascript"
                  theme="dark-plus"
                />
              </VStack>
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
}
