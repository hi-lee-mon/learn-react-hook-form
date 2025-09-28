"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";
import Spacer from "@/components/layout/spacer";
import VStack from "@/components/layout/v-stack";
import ApiReferenceSection from "@/components/lesson/ApiReferenceSection";
import BackToBasicsButton from "@/components/lesson/BackToBasicsButton";
import LessonIntroSection from "@/components/lesson/LessonIntroSection";
import LessonLayout from "@/components/lesson/LessonLayout";
import LessonNote from "@/components/lesson/LessonNote";
import LessonPageHeader from "@/components/lesson/LessonPageHeader";
import LessonSummary from "@/components/lesson/LessonSummary";
import StepByStepLearning from "@/components/lesson/StepByStepLearning";

// レッスンデータ
const lessonData = {
  header: {
    title: "React Hook Form × MUI 統合ガイド",
    description:
      "Material-UIコンポーネントとReact Hook Formを効果的に組み合わせる方法を学びましょう",
  },
  intro: {
    title: "MUIとの統合が重要な理由",
    description:
      "MUIは高品質なReactコンポーネントライブラリですが、React Hook Formと組み合わせる際にはいくつかの考慮点があります。適切な統合により、美しいUIと堅牢なフォーム管理を両立できます。",
    alertMessage:
      "MUIコンポーネントの中には、標準のHTML入力要素と異なる動作をするものがあります。Controllerコンポーネントを使うことで、これらのコンポーネントもReact Hook Formで管理できます。",
  },
  steps: {
    title: "ステップバイステップで学習",
    stepLabels: [
      "基本的なTextField",
      "Controllerの使用",
      "複雑なコンポーネント",
      "統合フォーム例",
    ],
  },
  summary: {
    title: "重要なポイント",
    keyPoints: {
      title: "✅ MUI統合の基本",
      code: `<Controller
  name="fieldName"
  control={control}
  render={({ field }) => <MuiComponent {...field} />}
/>`,
    },
    commonMistakes: {
      title: "⚠️ よくある間違い",
      description:
        "MUIコンポーネントに直接registerを適用しようとすると、動作しない場合があります。Controllerコンポーネントを使用してください。",
    },
    nextSteps: {
      title: "💡 次のステップ",
      description:
        "MUIとの統合をマスターしたら、次は「useForm API 引数編」でフォームの詳細設定を学びましょう！",
    },
  },
};

// コード例とデータ
const codeExamples = {
  withoutController: `// ❌ 正しく動作しない可能性があります
<TextField
  {...register('username')}
  label="ユーザー名"
  variant="outlined"
/>

// Select や Slider などの複雑なコンポーネントでは
// さらに問題が発生しやすいです`,
  withController: `// ✅ Controllerを使用した正しい方法
<Controller
  name="username"
  control={control}
  rules={{ required: 'ユーザー名は必須です' }}
  render={({ field, fieldState: { error } }) => (
    <TextField
      {...field}
      label="ユーザー名"
      variant="outlined"
      error={!!error}
      helperText={error?.message}
    />
  )}
/>`,
};

// APIリファレンスデータ
const apiReferences = [
  {
    title: "Controller - 外部コンポーネント統合",
    description:
      "React Hook Formと外部UIライブラリのコンポーネントを統合します。",
    level: "基本" as const,
    code: `<Controller
  name="fieldName"
  control={control}
  rules={{ required: true }}
  render={({ field, fieldState, formState }) => (
    <CustomComponent {...field} />
  )}
/>`,
  },
  {
    title: "field プロパティ",
    description: "フィールドの値と変更イベントハンドラを提供します。",
    level: "基本" as const,
    code: `// field には以下が含まれます：
// - value: 現在の値
// - onChange: 値変更ハンドラ
// - onBlur: ブラーイベントハンドラ
// - name: フィールド名
// - ref: 参照

render={({ field }) => (
  <TextField {...field} />
)}`,
  },
  {
    title: "fieldState プロパティ",
    description:
      "フィールドの状態情報（エラー、バリデーション状態など）を提供します。",
    level: "中級" as const,
    code: `render={({ field, fieldState }) => (
  <TextField
    {...field}
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
  />
)}`,
  },
];

interface FormData {
  username: string;
  email: string;
  category: string;
  notifications: boolean;
  theme: string;
  volume: number;
  newsletter: boolean;
}

export default function MuiIntegrationPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      category: "",
      notifications: false,
      theme: "light",
      volume: 50,
      newsletter: false,
    },
  });

  const onSubmit = (data: FormData) => {
    alert(`フォーム送信成功！\n${JSON.stringify(data, null, 2)}`);
  };

  // ステップコンテンツの定義
  const stepContents = [
    {
      title: "Step 1: 基本的なTextField",
      description:
        "TextFieldのような単純なMUIコンポーネントは、registerで直接管理できます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`<TextField
  {...register('username', { required: 'ユーザー名は必須です' })}
  label="ユーザー名"
  variant="outlined"
  fullWidth
  error={!!errors.username}
  helperText={errors.username?.message}
/>`}
            language="jsx"
            theme="dark-plus"
            title="基本的なTextField"
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
              {...register("username", { required: "ユーザー名は必須です" })}
              label="ユーザー名"
              variant="outlined"
              fullWidth
              placeholder="your_username"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Box>
          <LessonNote type="info">
            TextFieldは内部でinput要素を使用しているため、registerで直接管理できます。error
            と helperText プロパティでバリデーションエラーを表示できます。
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 2: Controllerの使用",
      description: "より複雑なコンポーネントには、Controllerを使用します。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`<Controller
  name="email"
  control={control}
  rules={{
    required: 'メールアドレスは必須です',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
      message: '正しいメールアドレスを入力してください'
    }
  }}
  render={({ field, fieldState: { error } }) => (
    <TextField
      {...field}
      label="メールアドレス"
      type="email"
      variant="outlined"
      fullWidth
      error={!!error}
      helperText={error?.message}
    />
  )}
/>`}
            language="jsx"
            theme="dark-plus"
            title="Controllerを使用したTextField"
          />
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "正しいメールアドレスを入力してください",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="メールアドレス"
                  type="email"
                  variant="outlined"
                  fullWidth
                  placeholder="your@email.com"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
          <LessonNote type="tip">
            Controllerを使うことで、fieldとfieldStateの情報にアクセスでき、より細かい制御ができます。
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 3: 複雑なコンポーネント",
      description:
        "Select、Checkbox、Slider などの複雑なMUIコンポーネントもControllerで統合できます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`// Select コンポーネント
<Controller
  name="category"
  control={control}
  rules={{ required: 'カテゴリを選択してください' }}
  render={({ field, fieldState: { error } }) => (
    <TextField
      {...field}
      select
      label="カテゴリ"
      variant="outlined"
      fullWidth
      error={!!error}
      helperText={error?.message}
    >
      <MenuItem value="frontend">フロントエンド</MenuItem>
      <MenuItem value="backend">バックエンド</MenuItem>
      <MenuItem value="fullstack">フルスタック</MenuItem>
    </TextField>
  )}
/>

// Checkbox コンポーネント
<Controller
  name="notifications"
  control={control}
  render={({ field }) => (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} />}
      label="通知を受け取る"
    />
  )}
/>`}
            language="jsx"
            theme="dark-plus"
            title="複雑なMUIコンポーネント"
          />
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <VStack spacing={3}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "カテゴリを選択してください" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    label="カテゴリ"
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  >
                    <MenuItem value="frontend">フロントエンド</MenuItem>
                    <MenuItem value="backend">バックエンド</MenuItem>
                    <MenuItem value="fullstack">フルスタック</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="notifications"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="通知を受け取る"
                  />
                )}
              />

              <Box>
                <Typography gutterBottom>音量設定</Typography>
                <Controller
                  name="volume"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                    />
                  )}
                />
              </Box>
            </VStack>
          </Box>
          <LessonNote type="important">
            CheckboxやSliderなどのコンポーネントでは、checked やvalue
            プロパティを適切に設定することが重要です。
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 4: 統合フォーム例",
      description:
        "様々なMUIコンポーネントを組み合わせた完全なフォーム例です。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        {...register('username', { required: 'ユーザー名は必須です' })}
        label="ユーザー名"
        variant="outlined"
        fullWidth
      />
    </Grid>

    <Grid size={{ xs: 12, sm: 6 }}>
      <Controller
        name="theme"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <FormLabel>テーマ</FormLabel>
            <RadioGroup {...field} row>
              <FormControlLabel value="light" control={<Radio />} label="ライト" />
              <FormControlLabel value="dark" control={<Radio />} label="ダーク" />
            </RadioGroup>
          </FormControl>
        )}
      />
    </Grid>

    <Grid size={{ xs: 12 }}>
      <Button type="submit" variant="contained" color="primary">
        送信
      </Button>
    </Grid>
  </Grid>
</form>`}
            language="jsx"
            theme="dark-plus"
            title="統合フォーム例"
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
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...register("username", {
                      required: "ユーザー名は必須です",
                    })}
                    label="ユーザー名"
                    variant="outlined"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "メールアドレスは必須です",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "正しいメールアドレスを入力してください",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="メールアドレス"
                        type="email"
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "カテゴリを選択してください" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        select
                        label="カテゴリ"
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      >
                        <MenuItem value="frontend">フロントエンド</MenuItem>
                        <MenuItem value="backend">バックエンド</MenuItem>
                        <MenuItem value="fullstack">フルスタック</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="theme"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel>テーマ設定</FormLabel>
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
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Controller
                      name="notifications"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={field.value} />
                          }
                          label="通知を受け取る"
                        />
                      )}
                    />

                    <Controller
                      name="newsletter"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Switch {...field} checked={field.value} />}
                          label="ニュースレター購読"
                        />
                      )}
                    />
                  </Box>
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
          <LessonNote type="tip">
            様々なMUIコンポーネントを組み合わせることで、リッチで使いやすいフォームを作成できます。実際に操作してみて、動作を確認してください！
          </LessonNote>
        </VStack>
      ),
    },
  ];

  return (
    <LessonLayout>
      {/* 固定位置の戻るボタン */}
      <BackToBasicsButton position="fixed" />

      {/* ページヘッダー */}
      <LessonPageHeader
        title={lessonData.header.title}
        description={lessonData.header.description}
      />

      <Spacer size={32} />

      {/* 導入セクション */}
      <LessonIntroSection
        title={lessonData.intro.title}
        description={lessonData.intro.description}
        alertMessage={lessonData.intro.alertMessage}
        beforeCode={{
          title: "❌ 問題のあるアプローチ",
          code: codeExamples.withoutController,
        }}
        afterCode={{
          title: "✅ Controllerを使った正しいアプローチ",
          code: codeExamples.withController,
        }}
        benefits={{
          title: "🚀 MUI統合の利点:",
          items: [
            "一貫性: 全てのコンポーネントが同じパターンで管理",
            "バリデーション: MUIコンポーネントでも自動バリデーション",
            "エラー表示: MUIのエラー表示機能との完全統合",
            "パフォーマンス: 不要な再レンダリングを防止",
            "開発体験: TypeScriptとの親和性も高い",
          ],
        }}
      />

      <Spacer size={32} />

      {/* ステップバイステップ学習 */}
      <StepByStepLearning
        title={lessonData.steps.title}
        steps={lessonData.steps.stepLabels}
        stepContents={stepContents}
      />

      <Spacer size={32} />

      {/* APIリファレンス詳細 */}
      <ApiReferenceSection
        title="Controller API リファレンス"
        references={apiReferences}
      />

      <Spacer size={32} />

      {/* 重要なポイント */}
      <LessonSummary
        title={lessonData.summary.title}
        keyPoints={lessonData.summary.keyPoints}
        commonMistakes={lessonData.summary.commonMistakes}
        nextSteps={lessonData.summary.nextSteps}
      />
    </LessonLayout>
  );
}
