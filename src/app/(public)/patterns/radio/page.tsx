"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";
import PageHeader from "@/components/base/page-header";
import BackButton from "@/components/layout/back-button";
import Spacer from "@/components/layout/spacer";

interface RadioFormData {
  gender: string;
  subscription: string;
  theme: string;
}

export default function RadioPatternPage() {
  const [submittedData, setSubmittedData] = useState<RadioFormData | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RadioFormData>({
    defaultValues: {
      gender: "",
      subscription: "",
      theme: "light",
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: RadioFormData) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton href="/patterns" />

      <PageHeader
        title="ラジオボタンの実装パターン"
        subtitle="React Hook FormでMUIのRadioコンポーネントを使用する方法を学習します"
      />

      <Spacer size={32} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              実装例
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset" error={!!errors.gender}>
                  <FormLabel component="legend">性別 *</FormLabel>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "性別を選択してください" }}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="男性"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="女性"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="その他"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.gender && (
                    <Typography color="error" variant="caption">
                      {errors.gender.message}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">サブスクリプション</FormLabel>
                  <Controller
                    name="subscription"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="free"
                          control={<Radio />}
                          label="無料プラン"
                        />
                        <FormControlLabel
                          value="basic"
                          control={<Radio />}
                          label="ベーシックプラン (¥500/月)"
                        />
                        <FormControlLabel
                          value="premium"
                          control={<Radio />}
                          label="プレミアムプラン (¥1000/月)"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">テーマ</FormLabel>
                  <Controller
                    name="theme"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="light"
                          control={<Radio />}
                          label="ライト"
                        />
                        <FormControlLabel
                          value="dark"
                          control={<Radio />}
                          label="ダーク"
                        />
                        <FormControlLabel
                          value="auto"
                          control={<Radio />}
                          label="自動"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained">
                  送信
                </Button>
                <Button type="button" variant="outlined" onClick={handleReset}>
                  リセット
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              現在の値
            </Typography>
            <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
          </Paper>

          {submittedData && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                送信されたデータ
              </Typography>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Spacer size={40} />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          実装コード例
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          1. 型定義
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`interface RadioFormData {
  gender: string;
  subscription: string;
  theme: string;
}`}
            language="typescript"
            title="型定義"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          2. useFormの設定
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`const { control, handleSubmit, formState: { errors }, watch, reset } =
  useForm<RadioFormData>({
    defaultValues: {
      gender: "",
      subscription: "",
      theme: "light", // デフォルト値を設定
    },
  });`}
            language="typescript"
            title="useFormの設定"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          3. Controllerを使った実装
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`<FormControl component="fieldset" error={!!errors.gender}>
  <FormLabel component="legend">性別 *</FormLabel>
  <Controller
    name="gender"
    control={control}
    rules={{ required: "性別を選択してください" }}
    render={({ field }) => (
      <RadioGroup {...field}>
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="男性"
        />
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="女性"
        />
        <FormControlLabel
          value="other"
          control={<Radio />}
          label="その他"
        />
      </RadioGroup>
    )}
  />
  {errors.gender && (
    <Typography color="error" variant="caption">
      {errors.gender.message}
    </Typography>
  )}
</FormControl>`}
            language="tsx"
            title="Controllerを使った実装"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          4. 水平配置の場合
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`<RadioGroup {...field} row>
  <FormControlLabel value="light" control={<Radio />} label="ライト" />
  <FormControlLabel value="dark" control={<Radio />} label="ダーク" />
  <FormControlLabel value="auto" control={<Radio />} label="自動" />
</RadioGroup>`}
            language="tsx"
            title="水平配置の場合"
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          実装のポイント
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Controller を使用する理由:</strong>
            <br />
            React Hook
            FormでMUIのRadioGroupを制御するには、ControllerコンポーネントでControlled
            Componentとして実装する必要があります。
          </Typography>
        </Alert>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>バリデーション:</strong>
            <br />
            rulesプロパティでバリデーションルールを設定できます。必須項目の場合はrequiredを指定します。
          </Typography>
        </Alert>

        <Alert severity="warning">
          <Typography variant="body2">
            <strong>注意点:</strong>
            <br />
            RadioGroupのrowプロパティをtrueにすると水平配置になります。デフォルトは縦配置です。
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
}
