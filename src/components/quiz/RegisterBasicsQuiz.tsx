"use client";

import { useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";

import QuizCard from "./QuizCard";

import HStack from "@/components/layout/h-stack";
import VStack from "@/components/layout/v-stack";

const quizQuestions = [
  {
    id: "q1",
    question: "React Hook Formでフォームフィールドを登録する関数は何ですか？",
    hint: "フォームの入力要素をライブラリに登録するために使用します",
    options: [
      {
        id: "a",
        text: "useField()",
        isCorrect: false,
      },
      {
        id: "b",
        text: "register()",
        isCorrect: true,
        explanation:
          "register()は、HTMLの入力要素をReact Hook Formに登録するメイン関数です。これにより、フォームの状態管理とバリデーションが自動的に行われます。",
      },
      {
        id: "c",
        text: "formField()",
        isCorrect: false,
      },
      {
        id: "d",
        text: "inputRegister()",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q2",
    question:
      "必須入力フィールドを設定するために、registerの第2引数に渡すバリデーションルールは？",
    hint: "フィールドが空の場合にエラーを表示したい場合に使用します",
    options: [
      {
        id: "a",
        text: "{ mandatory: true }",
        isCorrect: false,
      },
      {
        id: "b",
        text: "{ required: true }",
        isCorrect: true,
        explanation:
          "{ required: true }または{ required: 'エラーメッセージ' }で必須入力を設定できます。文字列を渡すとカスタムエラーメッセージが表示されます。",
      },
      {
        id: "c",
        text: "{ validate: true }",
        isCorrect: false,
      },
      {
        id: "d",
        text: "{ notEmpty: true }",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q3",
    question:
      "バリデーションエラーを表示するために使用するformStateのプロパティは？",
    hint: "useFormから取得できるformStateオブジェクトの中にあります",
    options: [
      {
        id: "a",
        text: "validationErrors",
        isCorrect: false,
      },
      {
        id: "b",
        text: "fieldErrors",
        isCorrect: false,
      },
      {
        id: "c",
        text: "errors",
        isCorrect: true,
        explanation:
          "formState.errorsには各フィールドのバリデーションエラー情報が格納されます。errors.fieldName?.messageでエラーメッセージにアクセスできます。",
      },
      {
        id: "d",
        text: "messages",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q4",
    question:
      "registerを使ったフィールドで避けるべき、よくある間違いは何ですか？",
    hint: "React Hook Formが自動的に管理するものを手動で設定してしまうミス",
    options: [
      {
        id: "a",
        text: "placeholder属性を設定する",
        isCorrect: false,
      },
      {
        id: "b",
        text: "独自のonChangeとvalueを設定する",
        isCorrect: true,
        explanation:
          "registerを使ったフィールドには、独自のonChangeやvalueを設定してはいけません。React Hook Formが自動的にこれらを管理するため、競合してしまいます。",
      },
      {
        id: "c",
        text: "type属性を設定する",
        isCorrect: false,
      },
      {
        id: "d",
        text: "name属性を設定する",
        isCorrect: false,
      },
    ],
  },
];

export default function RegisterBasicsQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(
    new Set(),
  );

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (completedQuestions.size / quizQuestions.length) * 100;
  const isAllCompleted = completedQuestions.size === quizQuestions.length;

  const handleQuestionComplete = () => {
    setCompletedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setCompletedQuestions(new Set());
  };

  return (
    <Card>
      <CardContent>
        <VStack spacing={3}>
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EmojiEventsIcon color="primary" />
              register API 理解度チェック
            </Typography>
            <Typography variant="body2" color="text.secondary">
              学習した内容を確認してみましょう！全問正解を目指してください。
            </Typography>
          </Box>

          <Box>
            <HStack sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                進捗: {completedQuestions.size} / {quizQuestions.length} 問完了
              </Typography>
              <Typography variant="body2" color="primary" sx={{ ml: "auto" }}>
                {Math.round(progress)}%
              </Typography>
            </HStack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {isAllCompleted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <VStack spacing={1}>
                <Typography variant="subtitle2">
                  🎉 おめでとうございます！
                </Typography>
                <Typography variant="body2">
                  全ての問題に正解しました！register
                  APIの基本をしっかりと理解できています。
                  次のステップに進む準備ができました！
                </Typography>
              </VStack>
            </Alert>
          )}

          <QuizCard
            key={currentQuestion.id}
            question={currentQuestion}
            onComplete={handleQuestionComplete}
          />

          <HStack>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              前の問題
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mx: 2, alignSelf: "center" }}
            >
              {currentQuestionIndex + 1} / {quizQuestions.length}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={currentQuestionIndex === quizQuestions.length - 1}
            >
              次の問題
            </Button>

            <Box sx={{ flex: 1 }} />

            <Button variant="text" onClick={handleReset} size="small">
              最初から
            </Button>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
}
