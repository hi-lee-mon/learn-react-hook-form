"use client";
import { ArrowBack } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

interface BackToBasicsButtonProps {
  position?: "fixed" | "inline";
}

export default function BackToBasicsButton({
  position = "fixed",
}: BackToBasicsButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/base");
  };

  if (position === "fixed") {
    return (
      <Tooltip title="基礎ページに戻る" placement="left">
        <Fab
          onClick={handleClick}
          color="primary"
          size="medium"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <ArrowBack />
        </Fab>
      </Tooltip>
    );
  }

  // インライン表示の場合（既存の動作）
  return (
    <Fab
      onClick={handleClick}
      variant="extended"
      size="medium"
      sx={{
        mb: 2,
      }}
    >
      <ArrowBack sx={{ mr: 1 }} />
      基礎ページに戻る
    </Fab>
  );
}
