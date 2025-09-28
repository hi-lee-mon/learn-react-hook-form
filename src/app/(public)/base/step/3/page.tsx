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
  Grid,
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
    title: "useForm API 引数編 - 詳細設定ガイド",
    description:
      "useFormの設定オプションを理解して、フォームの動作を細かく制御する方法を学びましょう",
  },
  intro: {
    title: "useForm設定オプションの重要性",
    description:
      "useFormは様々な設定オプションを受け取ることができます。これらのオプションを適切に設定することで、フォームの動作をプロジェクトの要件に合わせて細かく調整できます。",
    alertMessage:
      "設定オプションを理解することで、バリデーションタイミング、初期値、エラーハンドリングなどを思い通りに制御できるようになります。",
  },
  steps: {
    title: "ステップバイステップで学習",
    stepLabels: ["defaultValues", "mode設定", "resolver活用", "その他の設定"],
  },
  summary: {
    title: "重要なポイント",
    keyPoints: {
      title: "✅ useForm設定の基本",
      code: `const { register, handleSubmit } = useForm({
  defaultValues: { name: '', email: '' },
  mode: 'onChange',
  resolver: yupResolver(schema)
});`,
    },
    commonMistakes: {
      title: "⚠️ よくある間違い",
      description:
        "defaultValuesを後から変更しても、フォームの初期値は更新されません。動的に初期値を変更する場合は、resetメソッドを使用してください。",
    },
    nextSteps: {
      title: "💡 次のステップ",
      description:
        "useFormの設定をマスターしたら、次は「useForm API 戻り値編」でフォームの状態管理と制御方法を学びましょう！",
    },
  },
};

// コード例とデータ
const codeExamples = {
  basic: `// 基本的な使用方法
const { register, handleSubmit } = useForm();`,
  withOptions: `// 詳細な設定オプション付き
const {
  register,
  handleSubmit,
  control,
  formState: { errors, isSubmitting, isDirty, isValid }
} = useForm({
  // 初期値設定
  defaultValues: {
    username: '',
    email: '',
    age: 0,
    country: 'japan'
  },

  // バリデーションタイミング
  mode: 'onChange',

  // 再バリデーションタイミング
  reValidateMode: 'onChange',

  // フォーカス管理
  shouldFocusError: true,

  // 未変更値の除外
  shouldUnregister: false
});`,
};

// APIリファレンスデータ
const apiReferences = [
  {
    title: "defaultValues - 初期値設定",
    description: "フォームフィールドの初期値を設定します。",
    level: "基本" as const,
    code: `useForm({
  defaultValues: {
    username: 'defaultUser',
    email: 'user@example.com',
    isSubscribed: true
  }
})`,
  },
  {
    title: "mode - バリデーションタイミング",
    description: "バリデーションがいつ実行されるかを制御します。",
    level: "基本" as const,
    code: `// onSubmit: 送信時のみ（デフォルト）
// onChange: 値変更時
// onBlur: フォーカスが外れた時
// onTouched: 初回フォーカス後の値変更時
// all: onChange + onBlur

useForm({ mode: 'onChange' })`,
  },
  {
    title: "reValidateMode - 再バリデーション",
    description: "エラー発生後の再バリデーションタイミングを制御します。",
    level: "中級" as const,
    code: `useForm({
  mode: 'onSubmit',
  reValidateMode: 'onChange' // エラー後は onChange で再バリデーション
})`,
  },
  {
    title: "shouldFocusError - エラー時フォーカス",
    description:
      "バリデーションエラー時に該当フィールドにフォーカスするかを制御します。",
    level: "基本" as const,
    code: `useForm({
  shouldFocusError: true // エラー時に自動フォーカス（デフォルト）
})`,
  },
];

interface FormData {
  username: string;
  email: string;
  age: number;
  country: string;
  bio: string;
}

export default function UseFormArgsPage() {
  const [currentMode, setCurrentMode] = useState<
    "onSubmit" | "onChange" | "onBlur"
  >("onSubmit");
  const [submitCount, setSubmitCount] = useState(0);

  // デモ用の複数のフォーム設定
  const formConfigs = {
    onSubmit: useForm<FormData>({
      defaultValues: {
        username: "",
        email: "",
        age: 0,
        country: "japan",
        bio: "",
      },
      mode: "onSubmit",
    }),
    onChange: useForm<FormData>({
      defaultValues: {
        username: "demo_user",
        email: "demo@example.com",
        age: 25,
        country: "usa",
        bio: "React Hook Form enthusiast",
      },
      mode: "onChange",
    }),
    onBlur: useForm<FormData>({
      defaultValues: {
        username: "",
        email: "",
        age: 0,
        country: "",
        bio: "",
      },
      mode: "onBlur",
      shouldFocusError: true,
    }),
  };

  const currentForm = formConfigs[currentMode];

  const onSubmit = (data: FormData) => {
    setSubmitCount((prev) => prev + 1);
    alert(
      `フォーム送信成功！（${submitCount + 1}回目）\n${JSON.stringify(data, null, 2)}`,
    );
  };

  // ステップコンテンツの定義
  const stepContents = [
    {
      title: "Step 1: defaultValues - 初期値設定",
      description:
        "フォームフィールドの初期値を設定することで、ユーザー体験を向上させることができます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`const { register, handleSubmit } = useForm({
  defaultValues: {
    username: 'demo_user',        // 文字列の初期値
    email: 'demo@example.com',    // メールアドレス
    age: 25,                      // 数値の初期値
    country: 'japan',             // 選択肢の初期値
    isSubscribed: true            // ブール値の初期値
  }
});`}
            language="jsx"
            theme="dark-plus"
            title="defaultValues設定例"
          />
          <LessonNote type="info">
            defaultValuesは、フォームが初期化される際に一度だけ適用されます。動的に初期値を変更したい場合は、resetメソッドを使用します。
          </LessonNote>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              初期値設定の比較
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" color="error" gutterBottom>
                      初期値なし
                    </Typography>
                    <VStack spacing={2}>
                      <TextField
                        label="ユーザー名"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="空の状態"
                      />
                      <TextField
                        label="年齢"
                        type="number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="0"
                      />
                    </VStack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="success.main"
                      gutterBottom
                    >
                      初期値あり
                    </Typography>
                    <VStack spacing={2}>
                      <TextField
                        label="ユーザー名"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value="demo_user"
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        label="年齢"
                        type="number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value="25"
                        InputProps={{ readOnly: true }}
                      />
                    </VStack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </VStack>
      ),
    },
    {
      title: "Step 2: mode設定 - バリデーションタイミング",
      description:
        "いつバリデーションを実行するかを制御することで、ユーザー体験を調整できます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`// onSubmit: 送信時のみバリデーション（デフォルト）
useForm({ mode: 'onSubmit' })

// onChange: 値変更時にリアルタイムバリデーション
useForm({ mode: 'onChange' })

// onBlur: フィールドからフォーカスが外れた時
useForm({ mode: 'onBlur' })

// onTouched: 初回操作後の値変更時
useForm({ mode: 'onTouched' })

// all: onChange + onBlur の組み合わせ
useForm({ mode: 'all' })`}
            language="jsx"
            theme="dark-plus"
            title="mode設定オプション"
          />
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {(["onSubmit", "onChange", "onBlur"] as const).map((mode) => (
              <Chip
                key={mode}
                label={mode}
                color={currentMode === mode ? "primary" : "default"}
                onClick={() => setCurrentMode(mode)}
                variant={currentMode === mode ? "filled" : "outlined"}
              />
            ))}
          </Box>
          <Alert severity="info">
            現在選択中: <strong>{currentMode}</strong> モード
          </Alert>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {currentMode} モード デモ
            </Typography>
            <form onSubmit={currentForm.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...currentForm.register("username", {
                      required: "ユーザー名は必須です",
                      minLength: {
                        value: 3,
                        message: "3文字以上入力してください",
                      },
                    })}
                    label="ユーザー名"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!currentForm.formState.errors.username}
                    helperText={currentForm.formState.errors.username?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    {...currentForm.register("email", {
                      required: "メールアドレスは必須です",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "正しいメールアドレスを入力してください",
                      },
                    })}
                    label="メールアドレス"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!currentForm.formState.errors.email}
                    helperText={currentForm.formState.errors.email?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button type="submit" variant="contained" color="primary">
                    送信してみる
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
          <LessonNote type="tip">
            各モードを切り替えて、バリデーションのタイミングの違いを実際に体験してみてください！
          </LessonNote>
        </VStack>
      ),
    },
    {
      title: "Step 3: resolver活用 - 外部バリデーション",
      description:
        "YupやZodなどの外部バリデーションライブラリと連携することで、より強力なバリデーションが可能になります。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`// Yup使用例
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  username: yup
    .string()
    .required('ユーザー名は必須です')
    .min(3, '3文字以上で入力してください'),
  email: yup
    .string()
    .required('メールアドレスは必須です')
    .email('正しいメールアドレスを入力してください'),
  age: yup
    .number()
    .required('年齢は必須です')
    .min(18, '18歳以上である必要があります')
    .max(100, '100歳以下で入力してください')
});

const { register, handleSubmit } = useForm({
  resolver: yupResolver(schema)
});

// Zod使用例
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(3, '3文字以上で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  age: z.number().min(18).max(100)
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});`}
            language="jsx"
            theme="dark-plus"
            title="外部バリデーションライブラリとの連携"
          />
          <LessonNote type="important">
            外部resolverを使用することで、複雑なバリデーションロジックを宣言的に記述でき、TypeScriptの型安全性も向上します。
          </LessonNote>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              resolverの利点
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      🎯 型安全性
                    </Typography>
                    <Typography variant="body2">
                      TypeScriptとの連携により、コンパイル時に型チェックが可能
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      🔄 再利用性
                    </Typography>
                    <Typography variant="body2">
                      スキーマを他のフォームや API でも再利用できる
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      📝 宣言的
                    </Typography>
                    <Typography variant="body2">
                      複雑なバリデーションロジックを分かりやすく記述
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </VStack>
      ),
    },
    {
      title: "Step 4: その他の重要な設定",
      description:
        "パフォーマンスやユーザビリティを向上させるその他の設定オプションを学びます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`const { register, handleSubmit } = useForm({
  // エラー時に自動フォーカス（デフォルト: true）
  shouldFocusError: true,

  // フィールドが unregister された時の動作（デフォルト: false）
  shouldUnregister: false,

  // 未変更値も送信データに含める（デフォルト: false）
  shouldUseNativeValidation: false,

  // 基準となる値の設定
  criteriaMode: 'firstError', // 'firstError' | 'all'

  // デバッグモード
  delayError: 500 // エラー表示を遅延させる（ms）
});`}
            language="jsx"
            theme="dark-plus"
            title="その他の設定オプション"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    shouldFocusError
                  </Typography>
                  <Typography variant="body2" paragraph>
                    バリデーションエラー時に、最初のエラーフィールドに自動的にフォーカスを移動します。
                  </Typography>
                  <Chip label="UX向上" color="success" size="small" />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    shouldUnregister
                  </Typography>
                  <Typography variant="body2" paragraph>
                    条件付きフィールドが非表示になった時に、その値を保持するかどうかを制御します。
                  </Typography>
                  <Chip label="動的フォーム" color="info" size="small" />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    criteriaMode
                  </Typography>
                  <Typography variant="body2" paragraph>
                    複数のバリデーションエラーがある場合に、最初のエラーのみ表示するか全て表示するかを制御します。
                  </Typography>
                  <Chip label="エラー表示" color="warning" size="small" />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    delayError
                  </Typography>
                  <Typography variant="body2" paragraph>
                    エラーメッセージの表示を遅延させることで、ユーザーの入力を妨げないようにします。
                  </Typography>
                  <Chip label="UX最適化" color="secondary" size="small" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <LessonNote type="tip">
            これらのオプションを組み合わせることで、プロジェクトの要件に最適化されたフォーム体験を提供できます。
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
          title: "⚙️ 詳細設定を活用した方法",
          code: codeExamples.withOptions,
        }}
        benefits={{
          title: "🚀 詳細設定の効果:",
          items: [
            "UX向上: エラー時の自動フォーカスで操作性向上",
            "パフォーマンス: 適切なバリデーションタイミングで高速化",
            "保守性: 外部resolverで複雑なロジックを整理",
            "型安全性: TypeScriptとの連携でバグを未然に防止",
            "柔軟性: 要件に応じた細かい調整が可能",
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
        title="useForm 設定オプション一覧"
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
