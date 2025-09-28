"use client";

import { useCallback, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";

// dynamic importでSSRの問題を回避
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

import HStack from "@/components/layout/h-stack";
import VStack from "@/components/layout/v-stack";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  hint?: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  onComplete?: () => void;
}

export default function QuizCard({ question, onComplete }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const [resultData, setResultData] = useState<{
    isCorrect: boolean;
    selectedOption: QuizOption | undefined;
  } | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // ウィンドウサイズを取得
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedAnswer) {
      console.log("No answer selected");
      return;
    }

    const selectedOption = question.options.find(
      (option) => option.id === selectedAnswer,
    );
    const isCorrect = selectedOption?.isCorrect ?? false;

    console.log("Selected Answer:", selectedAnswer);
    console.log("Selected Option:", selectedOption);
    console.log("Is Correct:", isCorrect);

    // 結果データを保存
    setResultData({ isCorrect, selectedOption });
    setShowResult(true);

    if (isCorrect) {
      console.log("Setting confetti to true");
      setShowConfetti(true);
      setConfettiOpacity(1);

      // 4秒後からフェードアウト開始
      setTimeout(() => {
        console.log("Starting fade out");
        setConfettiOpacity(0);
      }, 4000);

      // フェードアウト後に完全に非表示
      setTimeout(() => {
        console.log("Hiding confetti after fade out");
        setShowConfetti(false);
        setConfettiOpacity(1); // 次回のためにリセット
      }, 6000);

      onComplete?.();
    }
  }, [selectedAnswer, question.options, onComplete]);

  const handleReset = useCallback(() => {
    setSelectedAnswer("");
    setShowResult(false);
    setShowConfetti(false);
    setConfettiOpacity(1);
    setResultData(null);
  }, []);

  const correctOption = question.options.find((option) => option.isCorrect);

  useEffect(() => {
    console.log("showConfetti state changed:", showConfetti);
  }, [showConfetti]);

  console.log("Render - showConfetti:", showConfetti);

  return (
    <>
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={500}
          recycle={false}
          gravity={1}
          initialVelocityY={30}
          initialVelocityX={8}
          colors={[
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
            "#ffa500",
            "#800080",
          ]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: "none",
            opacity: confettiOpacity,
            transition: "opacity 2s ease-out",
          }}
        />
      )}

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <QuizIcon color="primary" />
            クイズ
          </Typography>

          <VStack spacing={3}>
            <Paper
              sx={{
                p: 2,
                bgcolor: "primary.50",
                border: "1px solid",
                borderColor: "primary.200",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {question.question}
              </Typography>
              {question.hint && !showResult && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, fontStyle: "italic" }}
                >
                  💡 ヒント: {question.hint}
                </Typography>
              )}
            </Paper>

            <Box>
              <RadioGroup
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.text}
                    disabled={showResult}
                    sx={{
                      mb: 1,
                      ...(showResult && {
                        bgcolor: option.isCorrect
                          ? "success.50"
                          : option.id === selectedAnswer
                            ? "error.50"
                            : "transparent",
                        borderRadius: 1,
                        p: 1,
                        border: "1px solid",
                        borderColor: option.isCorrect
                          ? "success.200"
                          : option.id === selectedAnswer
                            ? "error.200"
                            : "transparent",
                      }),
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>

            {showResult && resultData && (
              <Alert
                severity={resultData.isCorrect ? "success" : "error"}
                icon={
                  resultData.isCorrect ? <CheckCircleIcon /> : <ErrorIcon />
                }
              >
                <VStack spacing={1}>
                  <Typography variant="subtitle2">
                    {resultData.isCorrect ? "🎉 正解です！" : "❌ 不正解です"}
                  </Typography>
                  {correctOption && (
                    <Typography variant="body2">
                      <strong>正解:</strong> {correctOption.text}
                    </Typography>
                  )}
                  {correctOption?.explanation && (
                    <Typography variant="body2">
                      <strong>解説:</strong> {correctOption.explanation}
                    </Typography>
                  )}
                </VStack>
              </Alert>
            )}

            <HStack>
              {!showResult ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  size="large"
                >
                  回答する
                </Button>
              ) : (
                <Button variant="outlined" onClick={handleReset} size="large">
                  もう一度挑戦
                </Button>
              )}
            </HStack>
          </VStack>
        </CardContent>
      </Card>
    </>
  );
}
