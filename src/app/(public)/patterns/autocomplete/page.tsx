"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { CodeHighlight } from "@/components/CodeHighlight";
import PageHeader from "@/components/base/page-header";
import BackButton from "@/components/layout/back-button";
import Spacer from "@/components/layout/spacer";

interface Country {
  code: string;
  label: string;
  phone: string;
}

interface AutocompleteFormData {
  country: Country | null;
  skills: string[];
  language: string | null;
}

const countries: Country[] = [
  { code: "JP", label: "Japan", phone: "81" },
  { code: "US", label: "United States", phone: "1" },
  { code: "CN", label: "China", phone: "86" },
  { code: "IN", label: "India", phone: "91" },
  { code: "DE", label: "Germany", phone: "49" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "UK", label: "United Kingdom", phone: "44" },
  { code: "FR", label: "France", phone: "33" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "CA", label: "Canada", phone: "1" },
];

const skillsOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
];

const languages = [
  "日本語",
  "English",
  "中文",
  "Español",
  "Français",
  "Deutsch",
  "한국어",
  "Português",
  "Русский",
  "العربية",
];

export default function AutocompletePatternPage() {
  const [submittedData, setSubmittedData] =
    useState<AutocompleteFormData | null>(null);

  const { control, handleSubmit, watch, reset } = useForm<AutocompleteFormData>(
    {
      defaultValues: {
        country: null,
        skills: [],
        language: null,
      },
    },
  );

  const watchedValues = watch();

  const onSubmit = (data: AutocompleteFormData) => {
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
        title="オートコンプリートの実装パターン"
        subtitle="React Hook FormでMUIのAutocompleteコンポーネントを使用する方法を学習します"
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
                <Typography variant="subtitle1" gutterBottom>
                  国選択（単一選択）*
                </Typography>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "国を選択してください" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      value={value}
                      onChange={(_, newValue) => onChange(newValue)}
                      options={countries}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.code === value.code
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                          placeholder="国を選択してください"
                        />
                      )}
                      renderOption={(props, option) => {
                        const { key, ...otherProps } = props;
                        return (
                          <Box
                            key={key}
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...otherProps}
                          >
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        );
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  スキル（複数選択）
                </Typography>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      value={value}
                      onChange={(_, newValue) => onChange(newValue)}
                      options={skillsOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="スキルを選択してください"
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      limitTags={3}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  言語（フリー入力可能）
                </Typography>
                <Controller
                  name="language"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      freeSolo
                      value={value || ""}
                      onChange={(_, newValue) => onChange(newValue)}
                      onInputChange={(_, newInputValue) =>
                        onChange(newInputValue)
                      }
                      options={languages}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="言語を入力または選択してください"
                        />
                      )}
                    />
                  )}
                />
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
            code={`interface Country {
  code: string;
  label: string;
  phone: string;
}

interface AutocompleteFormData {
  country: Country | null;
  skills: string[];
  language: string | null;
}`}
            language="typescript"
            title="型定義"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          2. 単一選択（オブジェクト型）
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`<Controller
  name="country"
  control={control}
  rules={{ required: "国を選択してください" }}
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={countries}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error?.message}
          placeholder="国を選択してください"
        />
      )}
    />
  )}
/>`}
            language="tsx"
            title="単一選択（オブジェクト型）"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          3. 複数選択（文字列配列）
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`<Controller
  name="skills"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Autocomplete
      multiple
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={skillsOptions}
      renderInput={(params) => (
        <TextField {...params} placeholder="スキルを選択してください" />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={option}
          />
        ))
      }
      limitTags={3}
    />
  )}
/>`}
            language="tsx"
            title="複数選択（文字列配列）"
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          4. フリー入力対応
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CodeHighlight
            code={`<Controller
  name="language"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Autocomplete
      freeSolo
      value={value || ''}
      onChange={(_, newValue) => onChange(newValue)}
      onInputChange={(_, newInputValue) => onChange(newInputValue)}
      options={languages}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="言語を入力または選択してください"
        />
      )}
    />
  )}
/>`}
            language="tsx"
            title="フリー入力対応"
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          実装のポイント
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>単一選択:</strong>
            <br />
            valueとonChangeを適切に設定し、isOptionEqualToValueでオプションの比較方法を定義します。
          </Typography>
        </Alert>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>複数選択:</strong>
            <br />
            multipleプロパティをtrueにし、valueは配列型で管理します。renderTagsでChipの表示をカスタマイズできます。
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>フリー入力:</strong>
            <br />
            freeSoloプロパティをtrueにすると、オプションにない値も入力できます。onInputChangeも併用します。
          </Typography>
        </Alert>

        <Alert severity="error">
          <Typography variant="body2">
            <strong>注意点:</strong>
            <br />
            オブジェクト型のオプションを使用する場合は、isOptionEqualToValueで適切な比較を行わないと、選択状態が正しく反映されません。
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
}
