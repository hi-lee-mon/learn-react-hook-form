"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Alert,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CodeHighlight } from "@/components/CodeHighlight";

const steps = [
  "基本的なregister",
  "バリデーション追加",
  "エラーハンドリング",
  "完全なフォーム",
];

const traditionalReactCode = `const [name, setName] = useState("");
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  setName(e.target.value);
  // バリデーションロジック...
}

<input
  value={name}
  onChange={handleChange}
/>`;

const reactHookFormCode = `const { register } = useForm();

// これだけ！ 🎉

<input {...register('name')} />`;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
}

export default function RegisterBasicsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`フォーム送信成功！\n${JSON.stringify(data, null, 2)}`);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ページヘッダー */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Hook Form - register API の基本
        </Typography>
        <Typography variant="h6" color="text.secondary">
          フォームフィールドを登録して、バリデーションとエラーハンドリングを学びましょう
        </Typography>
      </Box>

      {/* 導入セクション */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CodeIcon color="primary" />
            register APIとは？
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>register</strong>は、HTMLの入力要素をReact Hook
            Formに登録するための関数です。
            これにより、フォームの状態管理とバリデーションが自動的に行われます。
          </Alert>
          <Typography variant="body1" sx={{ mb: 2 }}>
            従来のReactでは、各入力フィールドにstateとonChangeハンドラーを設定する必要がありました。
            React Hook Formのregisterを使うことで、これらを簡潔に管理できます。
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#f87171", mb: 1 }}>
                😵 従来のReact
              </Typography>
              <CodeHighlight
                code={traditionalReactCode}
                language="javascript"
                theme="dark-plus"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" sx={{ color: "#34d399", mb: 1 }}>
                ✨ React Hook Form
              </Typography>
              <CodeHighlight
                code={reactHookFormCode}
                language="javascript"
                theme="dark-plus"
              />
            </Grid>
          </Grid>

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
              <Box
                component="span"
                sx={{ color: "#34d399", fontWeight: "bold" }}
              >
                🚀 効果:
              </Box>{" "}
              コード量が約70%削減され、パフォーマンスも向上します！
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* ステップバイステップ学習 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ステップバイステップで学習
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 400 }}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Step 1: 基本的なregister
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  最もシンプルなregisterの使い方です。フィールド名を指定するだけで、入力値が自動的に管理されます。
                </Typography>
                <Paper sx={{ p: 2, bgcolor: "grey.50", mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", mb: 1 }}
                  >
                    {"<input {...register('firstName')} />"}
                  </Typography>
                </Paper>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                  }}
                >
                  <TextField
                    {...register("firstName")}
                    label="名前（First Name）"
                    variant="outlined"
                    fullWidth
                    placeholder="山田"
                  />
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Step 2: バリデーション追加
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  registerの第2引数にバリデーションルールを指定できます。
                </Typography>
                <Paper sx={{ p: 2, bgcolor: "grey.50", mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", mb: 1 }}
                  >
                    {"<input {...register('lastName', { required: true })} />"}
                  </Typography>
                </Paper>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                  }}
                >
                  <TextField
                    {...register("lastName", { required: "姓は必須です" })}
                    label="姓（Last Name）*"
                    variant="outlined"
                    fullWidth
                    placeholder="太郎"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Box>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Step 3: エラーハンドリング
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  errorsオブジェクトを使って、バリデーションエラーを表示します。
                </Typography>
                <Paper sx={{ p: 2, bgcolor: "grey.50", mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", mb: 1 }}
                  >
                    {"{errors.lastName && <span>エラーメッセージ</span>}"}
                  </Typography>
                </Paper>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                  }}
                >
                  <TextField
                    {...register("email", {
                      required: "メールアドレスは必須です",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "正しいメールアドレスを入力してください",
                      },
                    })}
                    label="メールアドレス*"
                    variant="outlined"
                    fullWidth
                    placeholder="example@email.com"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>
              </Box>
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Step 4: 完全なフォーム
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  handleSubmitと組み合わせて、完全なフォームを作成します。
                </Typography>
                <Paper sx={{ p: 2, bgcolor: "grey.50", mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", mb: 1 }}
                  >
                    {"<form onSubmit={handleSubmit(onSubmit)}>"}
                  </Typography>
                </Paper>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                  }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          {...register("firstName")}
                          label="名前"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          {...register("lastName", {
                            required: "姓は必須です",
                          })}
                          label="姓*"
                          variant="outlined"
                          fullWidth
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          {...register("email", {
                            required: "メールアドレスは必須です",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "正しいメールアドレスを入力してください",
                            },
                          })}
                          label="メールアドレス*"
                          variant="outlined"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                        >
                          送信
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              戻る
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleReset}>最初から</Button>
            ) : (
              <Button onClick={handleNext}>次へ</Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* バリデーションルール詳細 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            バリデーションルール一覧
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">required - 必須入力</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="基本"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  フィールドが必須であることを指定します。
                </Typography>
              </Box>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {"register('fieldName', { required: true })"}
                  <br />
                  {"register('fieldName', { required: 'エラーメッセージ' })"}
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">pattern - 正規表現パターン</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="中級"
                  color="secondary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  入力値が指定した正規表現パターンに一致するかをチェックします。
                </Typography>
              </Box>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {"register('email', {"}
                  <br />
                  {"  pattern: {"}
                  <br />
                  {"    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,"}
                  <br />
                  {"    message: 'メールアドレスの形式が正しくありません'"}
                  <br />
                  {"  }"}
                  <br />
                  {"})"}
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                minLength / maxLength - 文字数制限
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="基本"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  入力文字数の最小値・最大値を制限します。
                </Typography>
              </Box>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {"register('password', {"}
                  <br />
                  {"  minLength: {"}
                  <br />
                  {"    value: 8,"}
                  <br />
                  {"    message: 'パスワードは8文字以上で入力してください'"}
                  <br />
                  {"  },"}
                  <br />
                  {"  maxLength: {"}
                  <br />
                  {"    value: 20,"}
                  <br />
                  {"    message: 'パスワードは20文字以下で入力してください'"}
                  <br />
                  {"  }"}
                  <br />
                  {"})"}
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">min / max - 数値範囲</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="基本"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  数値入力の最小値・最大値を制限します。
                </Typography>
              </Box>
              <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {"register('age', {"}
                  <br />
                  {"  min: {"}
                  <br />
                  {"    value: 18,"}
                  <br />
                  {"    message: '18歳以上である必要があります'"}
                  <br />
                  {"  },"}
                  <br />
                  {"  max: {"}
                  <br />
                  {"    value: 100,"}
                  <br />
                  {"    message: '100歳以下で入力してください'"}
                  <br />
                  {"  }"}
                  <br />
                  {"})"}
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* 重要なポイント */}
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CheckCircleIcon color="success" />
            重要なポイント
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              ✅ registerの基本構文
            </Typography>
            <Typography variant="body2">
              {"<input {...register('fieldName', validationRules)} />"}
            </Typography>
          </Alert>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              ⚠️ よくある間違い
            </Typography>
            <Typography variant="body2">
              registerを使ったフィールドには、独自のonChangeやvalueを設定しないでください。
              React Hook Formが自動的に管理します。
            </Typography>
          </Alert>

          <Alert severity="info">
            <Typography variant="subtitle2" gutterBottom>
              💡 次のステップ
            </Typography>
            <Typography variant="body2">
              registerの基本をマスターしたら、次は「useFieldArray」を学んで動的なフィールドの管理方法を習得しましょう！
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </Container>
  );
}
