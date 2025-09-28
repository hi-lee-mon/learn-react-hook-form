"use client";

import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";

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
import RegisterBasicsQuiz from "@/components/quiz/RegisterBasicsQuiz";

// レッスンデータ
const lessonData = {
  header: {
    title: "React Hook Form - register API の基本",
    description:
      "フォームフィールドを登録して、バリデーションとエラーハンドリングを学びましょう",
  },
  intro: {
    title: "register APIとは？",
    description:
      "従来のReactでは、各入力フィールドにstateとonChangeハンドラーを設定する必要がありました。React Hook Formのregisterを使うことで、これらを簡潔に管理できます。",
    alertMessage:
      "registerは、HTMLの入力要素をReact Hook Formに登録するための関数です。これにより、フォームの状態管理とバリデーションが自動的に行われます。",
  },
  steps: {
    title: "ステップバイステップで学習",
    stepLabels: [
      "基本的なregister",
      "バリデーション追加",
      "エラーハンドリング",
      "完全なフォーム",
    ],
  },
  summary: {
    title: "重要なポイント",
    keyPoints: {
      title: "✅ registerの基本構文",
      code: `<input {...register('fieldName', validationRules)} />`,
    },
    commonMistakes: {
      title: "⚠️ よくある間違い",
      description:
        "registerを使ったフィールドには、独自のonChangeやvalueを設定しないでください。React Hook Formが自動的に管理します。",
    },
    nextSteps: {
      title: "💡 次のステップ",
      description:
        "registerの基本をマスターしたら、次は「useFieldArray」を学んで動的なフィールドの管理方法を習得しましょう！",
    },
  },
};

// コード例とデータ
const codeExamples = {
  traditional: `const [formData, setFormData] = useState({
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
);`,
  reactHookForm: `const {
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
);`,
};

// APIリファレンスデータ
const apiReferences = [
  {
    title: "required - 必須入力",
    description: "フィールドが必須であることを指定します。",
    level: "基本" as const,
    code: `register('fieldName', { required: true })
register('fieldName', { required: 'エラーメッセージ' })`,
  },
  {
    title: "pattern - 正規表現パターン",
    description:
      "入力値が指定した正規表現パターンに一致するかをチェックします。",
    level: "中級" as const,
    code: `register('email', {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
    message: 'メールアドレスの形式が正しくありません'
  }
})`,
  },
  {
    title: "minLength / maxLength - 文字数制限",
    description: "入力文字数の最小値・最大値を制限します。",
    level: "基本" as const,
    code: `register('password', {
  minLength: {
    value: 8,
    message: 'パスワードは8文字以上で入力してください'
  },
  maxLength: {
    value: 20,
    message: 'パスワードは20文字以下で入力してください'
  }
})`,
  },
  {
    title: "min / max - 数値範囲",
    description: "数値入力の最小値・最大値を制限します。",
    level: "基本" as const,
    code: `register('age', {
  min: {
    value: 18,
    message: '18歳以上である必要があります'
  },
  max: {
    value: 100,
    message: '100歳以下で入力してください'
  }
})`,
  },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
}

export default function RegisterBasicsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`フォーム送信成功！\n${JSON.stringify(data, null, 2)}`);
  };

  // ステップコンテンツの定義
  const stepContents = [
    {
      title: "Step 1: 基本的なregister",
      description:
        "最もシンプルなregisterの使い方です。フィールド名を指定するだけで、入力値が自動的に管理されます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`<input {...register('firstName')} />`}
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
      ),
    },
    {
      title: "Step 2: バリデーション追加",
      description: "registerの第2引数にバリデーションルールを指定できます。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`<input {...register('lastName', { required: true })} />`}
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
      ),
    },
    {
      title: "Step 3: エラーハンドリング",
      description:
        "errorsオブジェクトを使って、バリデーションエラーを表示します。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`{errors.lastName && <span>エラーメッセージ</span>}`}
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
      ),
    },
    {
      title: "Step 4: 完全なフォーム",
      description: "handleSubmitと組み合わせて、完全なフォームを作成します。",
      content: (
        <VStack spacing={2}>
          <CodeHighlight
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('firstName')} />
  <input {...register('lastName', { required: '姓は必須です' })} />
  {errors.lastName && <span>{errors.lastName.message}</span>}
  <button type="submit">送信</button>
</form>`}
            language="jsx"
            theme="dark-plus"
            title="完全なフォーム"
          />
          <LessonNote type="important">
            handleSubmitは、React Hook
            Formが提供する重要な関数です。フォーム送信時に自動的にバリデーションを実行し、エラーがなければonSubmit関数を呼び出します。
          </LessonNote>
          <LessonNote type="info">
            handleSubmit(onSubmit)の仕組み：
            <br />• フォーム送信時にevent.preventDefault()を自動実行
            <br />• 全フィールドのバリデーションを実行
            <br />• エラーがある場合は送信を停止し、errorsオブジェクトを更新
            <br />• エラーがない場合のみonSubmit関数にフォームデータを渡して実行
          </LessonNote>
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
          <LessonNote type="tip">
            実際に試してみましょう！必須フィールドを空にして送信ボタンを押すと、バリデーションエラーが表示され、送信が停止されます。全て正しく入力すると、アラートでフォームデータが表示されます。
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
          title: "😵 従来のReact",
          code: codeExamples.traditional,
        }}
        afterCode={{
          title: "😎 React Hook Form",
          code: codeExamples.reactHookForm,
        }}
        benefits={{
          title: "🚀 圧倒的な効果:",
          items: [
            "コード量: 約80行 → 30行（62%削減）",
            "バリデーション: 手動実装 → 宣言的設定",
            "エラー管理: 複雑なstate管理 → 自動処理",
            "パフォーマンス: 不要な再レンダリング → 最適化済み",
            "保守性: 分散したロジック → 集約されたコード",
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
        title="バリデーションルール一覧"
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

      {/* クイズセクション */}
      <RegisterBasicsQuiz />
    </LessonLayout>
  );
}
