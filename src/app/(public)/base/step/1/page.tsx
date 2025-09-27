"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";

import { CodeHighlight } from "@/components/CodeHighlight";
import HStack from "@/components/layout/h-stack";
import Spacer from "@/components/layout/spacer";
import VStack from "@/components/layout/v-stack";

const steps = [
  "基本的なregister",
  "バリデーション追加",
  "エラーハンドリング",
  "完全なフォーム",
];

const traditionalReactCode = `const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: ''
});
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

const validateField = (name, value) => {
  const newErrors = { ...errors };

  if (name === 'lastName' && !value.trim()) {
    newErrors.lastName = '姓は必須です';
  } else if (name === 'lastName') {
    delete newErrors.lastName;
  }

  if (name === 'email') {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i;
    if (!value.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!emailRegex.test(value)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    } else {
      delete newErrors.email;
    }
  }

  setErrors(newErrors);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  validateField(name, value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // 全フィールドのバリデーション
  validateField('lastName', formData.lastName);
  validateField('email', formData.email);

  if (Object.keys(errors).length === 0) {
    // フォーム送信処理
    console.log(formData);
  }
  setIsSubmitting(false);
};

return (
  <form onSubmit={handleSubmit}>
    <input
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
    />
    <input
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
    />
    {errors.lastName && <span>{errors.lastName}</span>}

    <input
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
    {errors.email && <span>{errors.email}</span>}

    <button type="submit" disabled={isSubmitting}>
      送信
    </button>
  </form>
);`;

const reactHookFormCode = `const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting }
} = useForm();

const onSubmit = (data) => {
  console.log(data);
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('firstName')} />

    <input {...register('lastName', {
      required: '姓は必須です'
    })} />
    {errors.lastName && <span>{errors.lastName.message}</span>}

    <input {...register('email', {
      required: 'メールアドレスは必須です',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
        message: '正しいメールアドレスを入力してください'
      }
    })} />
    {errors.email && <span>{errors.email.message}</span>}

    <button type="submit" disabled={isSubmitting}>
      送信
    </button>
  </form>
);`;

// ステップコード例
const step1Code = `<input {...register('firstName')} />`;

const step2Code = `<input {...register('lastName', { required: true })} />`;

const step3Code = `{errors.lastName && <span>エラーメッセージ</span>}`;

const step4Code = `<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('firstName')} />
  <input {...register('lastName', { required: '姓は必須です' })} />
  {errors.lastName && <span>{errors.lastName.message}</span>}
  <button type="submit">送信</button>
</form>`;

// バリデーションルールコード例
const requiredRuleCode = `register('fieldName', { required: true })
register('fieldName', { required: 'エラーメッセージ' })`;

const patternRuleCode = `register('email', {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
    message: 'メールアドレスの形式が正しくありません'
  }
})`;

const lengthRuleCode = `register('password', {
  minLength: {
    value: 8,
    message: 'パスワードは8文字以上で入力してください'
  },
  maxLength: {
    value: 20,
    message: 'パスワードは20文字以下で入力してください'
  }
})`;

const numberRuleCode = `register('age', {
  min: {
    value: 18,
    message: '18歳以上である必要があります'
  },
  max: {
    value: 100,
    message: '100歳以下で入力してください'
  }
})`;

// 重要なポイントのコード例
const basicSyntaxCode = `<input {...register('fieldName', validationRules)} />`;

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
      <VStack spacing={1}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Hook Form - register API の基本
        </Typography>
        <Typography variant="h6" color="text.secondary">
          フォームフィールドを登録して、バリデーションとエラーハンドリングを学びましょう
        </Typography>
      </VStack>

      <Spacer size={32} />

      {/* 導入セクション */}
      <Card>
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
              <CodeHighlight
                title="😵 従来のReact"
                code={traditionalReactCode}
                language="javascript"
                theme="dark-plus"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CodeHighlight
                title="😎 React Hook Form"
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
              <Typography
                component="span"
                sx={{ color: "#34d399", fontWeight: "bold" }}
              >
                🚀 圧倒的な効果:
              </Typography>
              <br />• <strong>コード量:</strong> 約80行 → 30行（62%削減）
              <br />• <strong>バリデーション:</strong> 手動実装 → 宣言的設定
              <br />• <strong>エラー管理:</strong> 複雑なstate管理 → 自動処理
              <br />• <strong>パフォーマンス:</strong> 不要な再レンダリング →
              最適化済み
              <br />• <strong>保守性:</strong> 分散したロジック →
              集約されたコード
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Spacer size={32} />

      {/* ステップバイステップ学習 */}
      <Card>
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
              <VStack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Step 1: 基本的なregister
                </Typography>
                <Typography variant="body1">
                  最もシンプルなregisterの使い方です。フィールド名を指定するだけで、入力値が自動的に管理されます。
                </Typography>
                <CodeHighlight
                  code={step1Code}
                  language="jsx"
                  theme="dark-plus"
                  title="基本的なregister"
                />
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
              </VStack>
            )}

            {activeStep === 1 && (
              <VStack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Step 2: バリデーション追加
                </Typography>
                <Typography variant="body1">
                  registerの第2引数にバリデーションルールを指定できます。
                </Typography>
                <CodeHighlight
                  code={step2Code}
                  language="jsx"
                  theme="dark-plus"
                  title="バリデーション追加"
                />
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
                    label="姓（Last Name）"
                    variant="outlined"
                    fullWidth
                    placeholder="太郎"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Box>
              </VStack>
            )}

            {activeStep === 2 && (
              <VStack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Step 3: エラーハンドリング
                </Typography>
                <Typography variant="body1">
                  errorsオブジェクトを使って、バリデーションエラーを表示します。
                </Typography>
                <CodeHighlight
                  code={step3Code}
                  language="jsx"
                  theme="dark-plus"
                  title="エラーハンドリング"
                />
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
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                    placeholder="example@email.com"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>
              </VStack>
            )}

            {activeStep === 3 && (
              <VStack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Step 4: 完全なフォーム
                </Typography>
                <Typography variant="body1">
                  handleSubmitと組み合わせて、完全なフォームを作成します。
                </Typography>
                <CodeHighlight
                  code={step4Code}
                  language="jsx"
                  theme="dark-plus"
                  title="完全なフォーム"
                />
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
                          label="姓"
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
                          label="メールアドレス"
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
              </VStack>
            )}
          </Box>

          <HStack sx={{ pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              戻る
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleReset}>最初から</Button>
            ) : (
              <Button onClick={handleNext}>次へ</Button>
            )}
          </HStack>
        </CardContent>
      </Card>

      <Spacer size={32} />

      {/* バリデーションルール詳細 */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            バリデーションルール一覧
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">required - 必須入力</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VStack spacing={2}>
                <VStack spacing={1}>
                  <Chip
                    label="基本"
                    color="primary"
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Typography variant="body2">
                    フィールドが必須であることを指定します。
                  </Typography>
                </VStack>
                <CodeHighlight
                  code={requiredRuleCode}
                  language="javascript"
                  theme="dark-plus"
                />
              </VStack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">pattern - 正規表現パターン</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VStack spacing={2}>
                <VStack spacing={1}>
                  <Chip
                    label="中級"
                    color="secondary"
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Typography variant="body2">
                    入力値が指定した正規表現パターンに一致するかをチェックします。
                  </Typography>
                </VStack>
                <CodeHighlight
                  code={patternRuleCode}
                  language="javascript"
                  theme="dark-plus"
                />
              </VStack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                minLength / maxLength - 文字数制限
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VStack spacing={2}>
                <VStack spacing={1}>
                  <Chip
                    label="基本"
                    color="primary"
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Typography variant="body2">
                    入力文字数の最小値・最大値を制限します。
                  </Typography>
                </VStack>
                <CodeHighlight
                  code={lengthRuleCode}
                  language="javascript"
                  theme="dark-plus"
                />
              </VStack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">min / max - 数値範囲</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VStack spacing={2}>
                <VStack spacing={1}>
                  <Chip
                    label="基本"
                    color="primary"
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Typography variant="body2">
                    数値入力の最小値・最大値を制限します。
                  </Typography>
                </VStack>
                <CodeHighlight
                  code={numberRuleCode}
                  language="javascript"
                  theme="dark-plus"
                />
              </VStack>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      <Spacer size={32} />

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
            <VStack spacing={1}>
              <Typography variant="subtitle2" gutterBottom>
                ✅ registerの基本構文
              </Typography>
              <CodeHighlight
                code={basicSyntaxCode}
                language="jsx"
                theme="dark-plus"
              />
            </VStack>
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
