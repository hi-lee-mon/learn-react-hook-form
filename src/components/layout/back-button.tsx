"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({ href, label = "戻る" }: BackButtonProps) {
  return (
    <Button
      component={Link}
      href={href}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      {label}
    </Button>
  );
}
