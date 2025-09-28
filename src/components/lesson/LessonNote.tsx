import { Alert, AlertColor, Box, Typography } from "@mui/material";
import { Lightbulb, Star, Warning, Close, MenuBook } from "@mui/icons-material";

export type LessonNoteType =
  | "tip"
  | "important"
  | "warning"
  | "mistake"
  | "info";

interface LessonNoteProps {
  type: LessonNoteType;
  title?: string;
  children: React.ReactNode;
}

const noteConfig = {
  tip: {
    severity: "info" as AlertColor,
    icon: <Lightbulb />,
    defaultTitle: "💡 ヒント",
    bgColor: "#e3f2fd",
    borderColor: "#2196f3",
    iconColor: "#2196f3",
  },
  important: {
    severity: "info" as AlertColor,
    icon: <Star />,
    defaultTitle: "⭐ 重要なポイント",
    bgColor: "#fff3e0",
    borderColor: "#ff9800",
    iconColor: "#ff9800",
  },
  warning: {
    severity: "warning" as AlertColor,
    icon: <Warning />,
    defaultTitle: "⚠️ 注意点",
    bgColor: "#fff8e1",
    borderColor: "#ff9800",
    iconColor: "#f57c00",
  },
  mistake: {
    severity: "error" as AlertColor,
    icon: <Close />,
    defaultTitle: "❌ よくある間違い",
    bgColor: "#ffebee",
    borderColor: "#f44336",
    iconColor: "#f44336",
  },
  info: {
    severity: "info" as AlertColor,
    icon: <MenuBook />,
    defaultTitle: "📖 詳細説明",
    bgColor: "#f3e5f5",
    borderColor: "#9c27b0",
    iconColor: "#9c27b0",
  },
};

export default function LessonNote({ type, title, children }: LessonNoteProps) {
  const config = noteConfig[type];
  const displayTitle = title || config.defaultTitle;

  return (
    <Alert
      severity={config.severity}
      icon={config.icon}
      sx={{
        mb: 2,
        bgcolor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        borderRadius: 2,
        "& .MuiAlert-icon": {
          color: config.iconColor,
        },
        "& .MuiAlert-message": {
          width: "100%",
        },
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: config.iconColor,
          }}
        >
          {displayTitle}
        </Typography>
        <Typography variant="body2" component="div">
          {children}
        </Typography>
      </Box>
    </Alert>
  );
}
