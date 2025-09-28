"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Add, Delete } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";
import PageHeader from "@/components/base/page-header";
import BackButton from "@/components/layout/back-button";
import Spacer from "@/components/layout/spacer";

interface Todo {
  title: string;
  description: string;
  estimatedHours: number;
}

interface TeamMember {
  name: string;
  role: string;
  email: string;
}

interface DynamicFormData {
  projectName: string;
  todos: Todo[];
  teamMembers: TeamMember[];
}

export default function DynamicPatternPage() {
  const [submittedData, setSubmittedData] = useState<DynamicFormData | null>(
    null,
  );

  const { control, handleSubmit, watch, reset } = useForm<DynamicFormData>({
    defaultValues: {
      projectName: "",
      todos: [{ title: "", description: "", estimatedHours: 1 }],
      teamMembers: [{ name: "", role: "", email: "" }],
    },
  });

  const {
    fields: todoFields,
    append: appendTodo,
    remove: removeTodo,
  } = useFieldArray({
    control,
    name: "todos",
  });

  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const watchedValues = watch();

  const onSubmit = (data: DynamicFormData) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  const addTodo = () => {
    appendTodo({ title: "", description: "", estimatedHours: 1 });
  };

  const addTeamMember = () => {
    appendMember({ name: "", role: "", email: "" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton href="/patterns" />

      <PageHeader
        title="動的なフォームの実装パターン"
        subtitle="useFieldArrayを使用して動的にフィールドを追加・削除する方法を学習します"
      />

      <Spacer size={32} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              実装例：プロジェクト管理フォーム
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name="projectName"
                  control={control}
                  rules={{ required: "プロジェクト名は必須です" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="プロジェクト名"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  TODO リスト
                </Typography>
                {todoFields.map((field, index) => (
                  <Card key={field.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "start", gap: 2 }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Controller
                            name={`todos.${index}.title`}
                            control={control}
                            rules={{ required: "タイトルは必須です" }}
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                {...field}
                                label={`TODO ${index + 1} タイトル`}
                                fullWidth
                                size="small"
                                error={!!error}
                                helperText={error?.message}
                                sx={{ mb: 2 }}
                              />
                            )}
                          />
                          <Controller
                            name={`todos.${index}.description`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="説明"
                                fullWidth
                                multiline
                                rows={2}
                                size="small"
                                sx={{ mb: 2 }}
                              />
                            )}
                          />
                          <Controller
                            name={`todos.${index}.estimatedHours`}
                            control={control}
                            rules={{
                              required: "見積時間は必須です",
                              min: {
                                value: 0.5,
                                message: "0.5時間以上を入力してください",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                {...field}
                                label="見積時間"
                                type="number"
                                size="small"
                                inputProps={{ step: 0.5, min: 0.5 }}
                                error={!!error}
                                helperText={error?.message}
                                sx={{ width: 150 }}
                              />
                            )}
                          />
                        </Box>
                        <IconButton
                          onClick={() => removeTodo(index)}
                          disabled={todoFields.length === 1}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={addTodo}
                  startIcon={<Add />}
                  variant="outlined"
                  size="small"
                >
                  TODO を追加
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  チームメンバー
                </Typography>
                {memberFields.map((field, index) => (
                  <Card key={field.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "start", gap: 2 }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Controller
                                name={`teamMembers.${index}.name`}
                                control={control}
                                rules={{ required: "名前は必須です" }}
                                render={({ field, fieldState: { error } }) => (
                                  <TextField
                                    {...field}
                                    label="名前"
                                    fullWidth
                                    size="small"
                                    error={!!error}
                                    helperText={error?.message}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Controller
                                name={`teamMembers.${index}.role`}
                                control={control}
                                rules={{ required: "役割は必須です" }}
                                render={({ field, fieldState: { error } }) => (
                                  <TextField
                                    {...field}
                                    label="役割"
                                    fullWidth
                                    size="small"
                                    error={!!error}
                                    helperText={error?.message}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid size={12}>
                              <Controller
                                name={`teamMembers.${index}.email`}
                                control={control}
                                rules={{
                                  required: "メールアドレスは必須です",
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message:
                                      "有効なメールアドレスを入力してください",
                                  },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                  <TextField
                                    {...field}
                                    label="メールアドレス"
                                    type="email"
                                    fullWidth
                                    size="small"
                                    error={!!error}
                                    helperText={error?.message}
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <IconButton
                          onClick={() => removeMember(index)}
                          disabled={memberFields.length === 1}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={addTeamMember}
                  startIcon={<Add />}
                  variant="outlined"
                  size="small"
                >
                  メンバーを追加
                </Button>
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
            <pre style={{ fontSize: "0.8rem", overflow: "auto" }}>
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </Paper>

          {submittedData && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                送信されたデータ
              </Typography>
              <pre style={{ fontSize: "0.8rem", overflow: "auto" }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
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
          1. useFieldArrayの設定
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`import { useForm, useFieldArray, Controller } from "react-hook-form";

const { control, handleSubmit, watch, reset } = useForm<DynamicFormData>({
  defaultValues: {
    projectName: "",
    todos: [{ title: "", description: "", estimatedHours: 1 }],
    teamMembers: [{ name: "", role: "", email: "" }],
  },
});

const {
  fields: todoFields,
  append: appendTodo,
  remove: removeTodo,
} = useFieldArray({
  control,
  name: "todos",
});`}
            language="typescript"
            title="useFieldArrayの設定"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          2. 動的フィールドの表示
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`{todoFields.map((field, index) => (
  <Card key={field.id} sx={{ mb: 2 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Controller
            name={\`todos.\${index}.title\`}
            control={control}
            rules={{ required: "タイトルは必須です" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={\`TODO \${index + 1} タイトル\`}
                fullWidth
                size="small"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <IconButton
          onClick={() => removeTodo(index)}
          disabled={todoFields.length === 1}
          color="error"
        >
          <Delete />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
))}`}
            language="tsx"
            title="動的フィールドの表示"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          3. 項目の追加・削除
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`const addTodo = () => {
  appendTodo({ title: "", description: "", estimatedHours: 1 });
};

// 追加ボタン
<Button
  onClick={addTodo}
  startIcon={<Add />}
  variant="outlined"
  size="small"
>
  TODO を追加
</Button>

// 削除は各項目のIconButtonで実行
<IconButton
  onClick={() => removeTodo(index)}
  disabled={todoFields.length === 1}  // 最低1件は残す
  color="error"
>
  <Delete />
</IconButton>`}
            language="tsx"
            title="項目の追加・削除"
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          実装のポイント
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>useFieldArray:</strong>
            <br />
            配列型のフィールドを動的に管理するためのフック。append、remove、insert
            などのメソッドが使用できます。
          </Typography>
        </Alert>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>ネストしたフィールド名:</strong>
            <br />
            `todos.{"{index}"}.title`
            のような形式でネストしたフィールドにアクセスできます。インデックスは自動的に管理されます。
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>keyプロパティ:</strong>
            <br />
            fieldsのidをkeyとして使用することで、React
            のリスト更新時の問題を防げます。
          </Typography>
        </Alert>

        <Alert severity="error">
          <Typography variant="body2">
            <strong>注意点:</strong>
            <br />
            最低限の項目数を確保するため、配列が空にならないよう制御することを推奨します。disabledプロパティで削除ボタンを無効化できます。
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
}
