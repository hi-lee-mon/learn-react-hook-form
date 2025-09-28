import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface Pattern {
  id: number;
  title: string;
  description: string;
  href?: string;
  buttonText: string;
  disabled?: boolean;
  icon: React.ReactNode;
  buttonIcon?: React.ReactNode;
  difficulty: "初級" | "中級" | "上級";
}

export const patterns: Pattern[] = [
  {
    id: 1,
    title: "ラジオボタン",
    description:
      "React Hook FormでMUIのRadioコンポーネントを使用する方法を学びます。複数の選択肢から一つを選ぶUIパターンを効率的に実装できます。",
    href: "/patterns/radio",
    buttonText: "実装例を見る",
    disabled: false,
    icon: <RadioButtonCheckedIcon color="primary" />,
    difficulty: "初級",
  },
  {
    id: 2,
    title: "オートコンプリート",
    description:
      "MUIのAutocompleteコンポーネントとReact Hook Formを統合する方法を学びます。検索可能なドロップダウンリストの実装パターンを習得できます。",
    href: "/patterns/autocomplete",
    buttonText: "実装例を見る",
    disabled: false,
    icon: <AutoAwesomeIcon color="primary" />,
    difficulty: "中級",
  },
  {
    id: 3,
    title: "プルダウン（Select）",
    description:
      "SelectコンポーネントとReact Hook Formの統合パターンを学びます。シンプルな選択リストから複雑な多段階選択まで対応できます。",
    href: "/patterns/select",
    buttonText: "実装例を見る",
    disabled: false,
    icon: <ArrowDropDownIcon color="primary" />,
    difficulty: "初級",
  },
  {
    id: 4,
    title: "動的なフォーム",
    description:
      "useFieldArrayを使用して動的にフィールドを追加・削除する方法を学びます。リストの管理や複雑なフォーム構造の実装パターンを習得できます。",
    href: "/patterns/dynamic",
    buttonText: "実装例を見る",
    disabled: false,
    icon: <DynamicFormIcon color="primary" />,
    difficulty: "上級",
  },
  {
    id: 5,
    title: "条件付きフォーム表示",
    description:
      "watchを使用して特定のフィールドの値に応じて他のフィールドを表示・非表示する方法を学びます。動的なUIの実装パターンを習得できます。",
    href: "/patterns/conditional",
    buttonText: "実装例を見る",
    disabled: false,
    icon: <VisibilityIcon color="primary" />,
    difficulty: "中級",
  },
];
