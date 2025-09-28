import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

export interface Step {
  id: number;
  title: string;
  description: string;
  href?: string;
  buttonText: string;
  disabled?: boolean;
  icon: React.ReactNode;
  buttonIcon?: React.ReactNode;
}

export const steps: Step[] = [
  {
    id: 1,
    title: "Step 1: register API",
    description:
      "React Hook Formの基本となるregister APIの使い方を学びます。フィールドの登録からバリデーション、エラーハンドリングまで段階的に習得できます。",
    href: "/base/step/1",
    buttonText: "学習を始める",
    disabled: false,
    icon: <CodeIcon color="primary" />,
    buttonIcon: <SchoolIcon />,
  },
  {
    id: 2,
    title: "Step 2: MUIとの統合",
    description:
      "Material-UIコンポーネントとReact Hook Formを効果的に組み合わせる方法を学びます。ControllerコンポーネントとMUIの各種コンポーネントとの統合パターンを習得できます。",
    href: "/base/step/2",
    buttonText: "学習を始める",
    disabled: false,
    icon: <CodeIcon color="primary" />,
    buttonIcon: <SchoolIcon />,
  },
  {
    id: 3,
    title: "Step 3: useForm API 引数編",
    description:
      "useFormの設定オプションを詳しく学びます。defaultValues、mode、resolverなど、フォームの動作を細かく制御する方法を習得できます。",
    href: "/base/step/3",
    buttonText: "学習を始める",
    disabled: false,
    icon: <CodeIcon color="primary" />,
    buttonIcon: <SchoolIcon />,
  },
  {
    id: 4,
    title: "Step 4: useForm API 戻り値編",
    description:
      "useFormが返すオブジェクトの活用方法を学びます。formState、setValue、watch、resetなど、フォームを思い通りに制御する技術を習得できます。",
    href: "/base/step/4",
    buttonText: "学習を始める",
    disabled: false,
    icon: <CodeIcon color="primary" />,
    buttonIcon: <SchoolIcon />,
  },
];
