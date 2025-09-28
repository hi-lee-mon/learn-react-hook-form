"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    title: "useForm API 戻り値編 - 完全制御ガイド",
    description:
      "useFormが返すオブジェクトの各プロパティを理解して、フォームを思い通りに制御する方法を学びましょう",
  },
  intro: {
    title: "useForm戻り値の活用重要性",
    description:
      "useFormは豊富なプロパティとメソッドを提供しており、これらを適切に活用することで、複雑なフォーム要件にも対応できます。フォームの状態監視、動的な値の変更、条件付きバリデーションなど、高度な機能を実現できます。",
    alertMessage:
      "formState、reset、setValue、watchなどの機能を理解することで、ユーザーに最適なフォーム体験を提供できるようになります。",
  },
  steps: {
    title: "ステップバイステップで学習",
    stepLabels: [
      "formState活用",
      "動的値制御",
      "フォームリセット",
      "高度な制御",
    ],
  },
  summary: {
    title: "重要なポイント",
    keyPoints: {
      title: "✅ useForm戻り値の活用",
      code: `const {
  register,
  handleSubmit,
  formState: { errors, isValid, isDirty },
  reset,
  setValue,
  watch,
  getValues
} = useForm();`,
    },
    commonMistakes: {
      title: "⚠️ よくある間違い",
      description:
        "formStateの値を直接変更しようとしても反映されません。setValue、reset、トリガーなどの適切なメソッドを使用してください。",
    },
    nextSteps: {
      title: "💡 次のステップ",
      description:
        "useFormの戻り値をマスターしたら、実際のプロジェクトで複雑なフォームを実装してみましょう！",
    },
  },
};

// コード例とデータ
const codeExamples = {
  basic: `// 基本的な戻り値の使用
const { register, handleSubmit } = useForm();`,
  advanced: `// 全ての戻り値を活用
const {
  // フィールド登録
  register,
  unregister,

  // フォーム処理
  handleSubmit,
  reset,

  // 状態管理
  formState: {
    errors,        // バリデーションエラー
    isValid,       // フォーム全体の妥当性
    isSubmitting,  // 送信中かどうか
    isDirty,       // 初期値から変更されたか
    dirtyFields,   // どのフィールドが変更されたか
    touchedFields, // どのフィールドが操作されたか
    isSubmitted,   // 送信されたかどうか
    isSubmitSuccessful, // 送信が成功したか
    submitCount,   // 送信回数
    isLoading,     // ローディング中か
    isValidating   // バリデーション中か
  },

  // 値の操作
  setValue,      // 値を設定
  getValue,      // 値を取得
  getValues,     // 全ての値を取得
  watch,         // 値の変更を監視

  // バリデーション
  trigger,       // 手動バリデーション実行
  clearErrors,   // エラーをクリア
  setError,      // エラーを設定

  // 制御
  control,       // 外部コンポーネント制御用
  setFocus       // フォーカス設定
} = useForm();`,
};

// APIリファレンスデータ
const apiReferences = [
  {
    title: "formState - フォーム状態",
    description: "フォームの現在の状態を表すオブジェクトです。",
    level: "基本" as const,
    code: `const { formState } = useForm();

// よく使用されるプロパティ
formState.errors        // バリデーションエラー
formState.isValid       // フォーム全体が有効かどうか
formState.isDirty       // 初期値から変更されたか
formState.isSubmitting  // 送信処理中かどうか`,
  },
  {
    title: "setValue - 値の設定",
    description: "プログラムから特定のフィールドの値を設定します。",
    level: "中級" as const,
    code: `const { setValue } = useForm();

// 単一の値を設定
setValue('username', 'newValue');

// 複数の値を設定
setValue('username', 'newValue', { shouldDirty: true });

// バリデーション実行も含める
setValue('email', 'new@email.com', {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true
});`,
  },
  {
    title: "watch - 値の監視",
    description:
      "フィールドの値をリアルタイムで監視し、変更に応じて処理を実行します。",
    level: "中級" as const,
    code: `const { watch } = useForm();

// 特定のフィールドを監視
const username = watch('username');

// 複数のフィールドを監視
const [username, email] = watch(['username', 'email']);

// 全ての値を監視
const allValues = watch();

// 変更時のコールバック付き監視
watch((data, { name, type }) => {
  console.log('フィールド変更:', name, data);
});`,
  },
  {
    title: "reset - フォームリセット",
    description: "フォームを初期状態にリセットします。",
    level: "基本" as const,
    code: `const { reset } = useForm();

// 全フィールドをリセット
reset();

// 特定の値でリセット
reset({
  username: '',
  email: 'default@email.com'
});

// 部分的にリセット
reset({}, {
  keepErrors: true,     // エラーを保持
  keepDirty: true,      // ダーティ状態を保持
  keepValues: false     // 値は初期化
});`,
  },
];

interface FormData {
  username: string;
  email: string;
  age: string;
  bio: string;
}

export default function UseFormReturnPage() {
  const [demoData, setDemoData] = useState<FormData>({
    username: "",
    email: "",
    age: "",
    bio: "",
  });

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    watch,
    trigger,
    clearErrors,
    setError,
    setFocus,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      age: "",
      bio: "",
    },
    mode: "onChange",
  });

  // 監視対象の値
  const watchedUsername = watch("username");
  const watchedEmail = watch("email");
  const allWatchedValues = watch();

  const onSubmit = (data: FormData) => {
    setDemoData(data);
    alert(`フォーム送信成功！\n${JSON.stringify(data, null, 2)}`);
  };

  // デモ用の関数
  const handleSetValue = () => {
    setValue("username", "demo_user", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", "demo@example.com", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleReset = () => {
    reset();
  };

  const handlePartialReset = () => {
    reset({
      username: "partial_reset",
      email: "",
      age: "25",
      bio: "リセット後のデフォルト値",
    });
  };

  const handleTriggerValidation = () => {
    trigger();
  };

  const handleSetError = () => {
    setError("username", {
      type: "custom",
      message: "カスタムエラーメッセージです",
    });
  };

  const handleClearErrors = () => {
    clearErrors();
  };

  // ステップコンテンツの定義
  const stepContents = [
    {
      title: "Step 1: formState活用 - フォーム状態の監視",
      description:
        "formStateを使用してフォームの状態をリアルタイムで監視し、UIに反映させることができます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`const {
  formState: {
    errors,        // バリデーションエラー
    isValid,       // フォーム全体が有効かどうか
    isDirty,       // 初期値から変更されたか
    isSubmitting,  // 送信処理中かどうか
    dirtyFields,   // 変更されたフィールド
    touchedFields, // 操作されたフィールド
    submitCount    // 送信回数
  }
} = useForm();

// UIでの活用例
<Button
  type="submit"
  disabled={!isValid || isSubmitting}
  variant="contained"
>
  {isSubmitting ? '送信中...' : '送信'}
</Button>`}
            language="jsx"
            theme="dark-plus"
            title="formState活用例"
          />
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              リアルタイム状態表示
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <VStack spacing={2}>
                  <TextField
                    {...register("username", {
                      required: "ユーザー名は必須です",
                      minLength: { value: 3, message: "3文字以上" },
                    })}
                    label="ユーザー名"
                    variant="outlined"
                    fullWidth
                    error={!!formState.errors.username}
                    helperText={formState.errors.username?.message}
                  />
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
                    error={!!formState.errors.email}
                    helperText={formState.errors.email?.message}
                  />
                </VStack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      フォーム状態
                    </Typography>
                    <VStack spacing={1}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2">有効:</Typography>
                        <Chip
                          label={formState.isValid ? "Yes" : "No"}
                          color={formState.isValid ? "success" : "error"}
                          size="small"
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2">変更:</Typography>
                        <Chip
                          label={formState.isDirty ? "Yes" : "No"}
                          color={formState.isDirty ? "warning" : "default"}
                          size="small"
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2">送信中:</Typography>
                        <Chip
                          label={formState.isSubmitting ? "Yes" : "No"}
                          color={formState.isSubmitting ? "info" : "default"}
                          size="small"
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2">送信回数:</Typography>
                        <Chip
                          label={formState.submitCount.toString()}
                          color="primary"
                          size="small"
                        />
                      </Box>
                    </VStack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <LessonNote type="info">
            formStateの各プロパティを活用することで、ユーザーにとって分かりやすいフォームUIを構築できます。
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 2: 動的値制御 - setValue & watch",
      description:
        "setValueで値を動的に設定し、watchで値の変更を監視することができます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`const { setValue, watch } = useForm();

// 値の設定
setValue('username', 'newValue', {
  shouldValidate: true,  // バリデーション実行
  shouldDirty: true,     // ダーティ状態にする
  shouldTouch: true      // タッチ状態にする
});

// 値の監視
const username = watch('username');
const email = watch('email');

// 全ての値を監視
const allValues = watch();

// 値の変更時に処理を実行
useEffect(() => {
  console.log('ユーザー名が変更されました:', username);
}, [username]);`}
            language="jsx"
            theme="dark-plus"
            title="動的値制御例"
          />
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              動的制御デモ
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <VStack spacing={2}>
                  <Button variant="outlined" onClick={handleSetValue} fullWidth>
                    デモ値を設定
                  </Button>
                  <TextField
                    {...register("username")}
                    label="ユーザー名"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    {...register("email")}
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                  />
                </VStack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      監視中の値
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>フィールド</TableCell>
                            <TableCell>現在の値</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>ユーザー名</TableCell>
                            <TableCell>{watchedUsername || "(空)"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>メールアドレス</TableCell>
                            <TableCell>{watchedEmail || "(空)"}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <LessonNote type="tip">
            watchを使って値の変更を監視し、他のフィールドの値を動的に変更するなど、インタラクティブなフォームを作成できます。
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 3: フォームリセット - reset活用",
      description:
        "resetメソッドを使用してフォームを初期状態に戻したり、特定の値でリセットできます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`const { reset } = useForm();

// 全フィールドを初期値にリセット
reset();

// 特定の値でリセット
reset({
  username: 'new_default',
  email: 'new@example.com'
});

// オプション付きリセット
reset({}, {
  keepErrors: true,      // エラーを保持
  keepDirty: false,      // ダーティ状態をリセット
  keepValues: false,     // 値をリセット
  keepDefaultValues: true // デフォルト値を保持
});`}
            language="jsx"
            theme="dark-plus"
            title="reset活用例"
          />
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              リセット機能デモ
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <VStack spacing={2}>
                  <TextField
                    {...register("username", {
                      required: "ユーザー名は必須です",
                    })}
                    label="ユーザー名"
                    variant="outlined"
                    fullWidth
                    error={!!formState.errors.username}
                    helperText={formState.errors.username?.message}
                  />
                  <TextField
                    {...register("age")}
                    label="年齢"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    {...register("bio")}
                    label="自己紹介"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                  />
                </VStack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <VStack spacing={1}>
                  <Button variant="outlined" onClick={handleReset} fullWidth>
                    完全リセット
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handlePartialReset}
                    fullWidth
                  >
                    部分リセット
                  </Button>
                  <Divider />
                  <Typography variant="caption" color="text.secondary">
                    現在の値:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", wordBreak: "break-all" }}
                  >
                    {JSON.stringify(allWatchedValues, null, 2)}
                  </Typography>
                </VStack>
              </Grid>
            </Grid>
          </Box>
          <LessonNote type="important">
            resetは非常に便利な機能ですが、使用する際はユーザーの入力データが失われることを考慮してください。確認ダイアログを表示するなどの配慮が重要です。
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 4: 高度な制御 - trigger, setError, clearErrors",
      description:
        "手動バリデーション、エラーの設定・クリア、フォーカス制御など、高度な機能を活用します。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`const { trigger, setError, clearErrors, setFocus } = useForm();

// 手動バリデーション実行
trigger();                    // 全フィールド
trigger('username');          // 特定フィールド
trigger(['username', 'email']); // 複数フィールド

// エラーの手動設定
setError('username', {
  type: 'custom',
  message: 'カスタムエラーメッセージ'
});

// エラーのクリア
clearErrors();           // 全エラー
clearErrors('username'); // 特定フィールド

// フォーカス設定
setFocus('username');    // 特定フィールドにフォーカス`}
            language="jsx"
            theme="dark-plus"
            title="高度な制御例"
          />
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              高度な制御デモ
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <VStack spacing={2}>
                  <TextField
                    {...register("username", {
                      required: "ユーザー名は必須です",
                      minLength: { value: 3, message: "3文字以上" },
                    })}
                    label="ユーザー名"
                    variant="outlined"
                    fullWidth
                    error={!!formState.errors.username}
                    helperText={formState.errors.username?.message}
                  />
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
                    error={!!formState.errors.email}
                    helperText={formState.errors.email?.message}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!formState.isValid}
                  >
                    送信
                  </Button>
                </VStack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <VStack spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={handleTriggerValidation}
                    size="small"
                    fullWidth
                  >
                    手動バリデーション
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleSetError}
                    size="small"
                    fullWidth
                  >
                    カスタムエラー設定
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearErrors}
                    size="small"
                    fullWidth
                  >
                    エラークリア
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setFocus("username")}
                    size="small"
                    fullWidth
                  >
                    ユーザー名にフォーカス
                  </Button>
                  <Divider />
                  <Typography variant="caption" color="text.secondary">
                    エラー状況:
                  </Typography>
                  <Alert
                    severity={
                      Object.keys(formState.errors).length > 0
                        ? "error"
                        : "success"
                    }
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {Object.keys(formState.errors).length > 0
                      ? `${Object.keys(formState.errors).length}個のエラー`
                      : "エラーなし"}
                  </Alert>
                </VStack>
              </Grid>
            </Grid>
          </Box>
          <LessonNote type="tip">
            これらの高度な制御機能を組み合わせることで、ユーザーにとって使いやすく、開発者にとって制御しやすいフォームを作成できます。
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
          title: "🔧 基本的な使用方法",
          code: codeExamples.basic,
        }}
        afterCode={{
          title: "🚀 全機能を活用した方法",
          code: codeExamples.advanced,
        }}
        benefits={{
          title: "🎯 戻り値活用の効果:",
          items: [
            "状態監視: リアルタイムでフォーム状態を把握",
            "動的制御: プログラムから値を設定・変更",
            "バリデーション: 手動でのバリデーション制御",
            "エラー管理: カスタムエラーの設定・クリア",
            "UX向上: フォーカス制御で操作性向上",
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
        title="useForm 戻り値一覧"
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

      <Spacer size={32} />

      {/* 最終送信データ表示 */}
      {Object.values(demoData).some((value) => value) && (
        <Box>
          <Typography variant="h6" gutterBottom>
            最後に送信されたデータ
          </Typography>
          <CodeHighlight
            code={JSON.stringify(demoData, null, 2)}
            language="json"
            theme="dark-plus"
            title="送信データ"
          />
        </Box>
      )}
    </LessonLayout>
  );
}
