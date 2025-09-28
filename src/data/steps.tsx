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
    title: "Step 2: バリデーション (準備中)",
    description:
      "より高度なバリデーション手法を学びます。カスタムバリデーション、非同期バリデーションなど。",
    buttonText: "Coming Soon",
    disabled: true,
    icon: <CodeIcon color="disabled" />,
  },
  {
    id: 3,
    title: "Step 3: フォーム送信 (準備中)",
    description:
      "フォームデータの送信、リセット、動的フィールドの管理方法を学びます。",
    buttonText: "Coming Soon",
    disabled: true,
    icon: <CodeIcon color="disabled" />,
  },
];
