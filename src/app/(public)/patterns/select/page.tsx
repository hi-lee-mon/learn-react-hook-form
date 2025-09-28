"use client";

import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import PageHeader from "@/components/base/page-header";
import Spacer from "@/components/layout/spacer";
import BackButton from "@/components/layout/back-button";

interface SelectFormData {
  category: string;
  priority: string;
  tags: string[];
  status: string;
}

const categories = [
  { value: "frontend", label: "フロントエンド" },
  { value: "backend", label: "バックエンド" },
  { value: "design", label: "デザイン" },
  { value: "mobile", label: "モバイル" },
  { value: "devops", label: "DevOps" },
];

const priorities = [
  { value: "low", label: "低", color: "#4caf50" },
  { value: "medium", label: "中", color: "#ff9800" },
  { value: "high", label: "高", color: "#f44336" },
  { value: "critical", label: "緊急", color: "#9c27b0" },
];

const tagOptions = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Docker",
  "AWS",
  "設計",
  "バグ修正",
  "新機能",
  "リファクタリング",
];

const statusOptions = [
  { value: "draft", label: "下書き" },
  { value: "review", label: "レビュー中" },
  { value: "approved", label: "承認済み" },
  { value: "published", label: "公開済み" },
  { value: "archived", label: "アーカイブ" },
];

export default function SelectPatternPage() {
  const [submittedData, setSubmittedData] = useState<SelectFormData | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SelectFormData>({
    defaultValues: {
      category: "",
      priority: "",
      tags: [],
      status: "draft",
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: SelectFormData) => {
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
        title="プルダウン（Select）の実装パターン"
        subtitle="React Hook FormでMUIのSelectコンポーネントを使用する方法を学習します"
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
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>カテゴリ *</InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "カテゴリを選択してください" }}
                    render={({ field }) => (
                      <Select {...field} label="カテゴリ *">
                        {categories.map((category) => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <FormHelperText>{errors.category.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>優先度</InputLabel>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="優先度">
                        {priorities.map((priority) => (
                          <MenuItem key={priority.value} value={priority.value}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  backgroundColor: priority.color,
                                  mr: 1,
                                }}
                              />
                              {priority.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>タグ（複数選択）</InputLabel>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        input={<OutlinedInput label="タグ（複数選択）" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {tagOptions.map((tag) => (
                          <MenuItem key={tag} value={tag}>
                            {tag}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>ステータス</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="ステータス">
                        {statusOptions.map((status) => (
                          <MenuItem key={status.value} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
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

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          実装のポイント
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>基本的な使用方法:</strong>
            <br />
            FormControlでラップし、InputLabelでラベルを設定します。ControllerでReact
            Hook Formと連携します。
          </Typography>
        </Alert>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>複数選択:</strong>
            <br />
            multipleプロパティをtrueにし、OutlinedInputとrenderValueを使用してChipで表示します。
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>カスタム表示:</strong>
            <br />
            MenuItemの中にBoxやアイコンを配置することで、視覚的により分かりやすい選択肢を作成できます。
          </Typography>
        </Alert>

        <Alert severity="error">
          <Typography variant="body2">
            <strong>注意点:</strong>
            <br />
            labelプロパティは、InputLabelのテキストと完全に一致させる必要があります。一致しないとアニメーションが正しく動作しません。
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
}
