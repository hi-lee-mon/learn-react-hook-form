"use client";

import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Button,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  Collapse,
  Card,
  CardContent,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import PageHeader from "@/components/base/page-header";
import Spacer from "@/components/layout/spacer";
import BackButton from "@/components/layout/back-button";

interface ConditionalFormData {
  accountType: "personal" | "business" | "";
  businessName?: string;
  businessType?: string;
  taxId?: string;
  employeeCount?: number;
  personalName?: string;
  age?: number;
  hasExperience: boolean;
  experienceYears?: number;
  programmingLanguages?: string[];
  subscriptionPlan: "free" | "basic" | "premium" | "";
  paymentMethod?: "credit" | "bank" | "";
  creditCardNumber?: string;
  bankAccountNumber?: string;
  newsletter: boolean;
  marketingEmails?: boolean;
}

const businessTypes = [
  "株式会社",
  "合同会社",
  "個人事業主",
  "NPO法人",
  "その他",
];

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "PHP",
];

export default function ConditionalPatternPage() {
  const [submittedData, setSubmittedData] =
    useState<ConditionalFormData | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ConditionalFormData>({
    defaultValues: {
      accountType: "",
      hasExperience: false,
      subscriptionPlan: "",
      newsletter: false,
    },
  });

  const watchedValues = watch();
  const accountType = watch("accountType");
  const hasExperience = watch("hasExperience");
  const subscriptionPlan = watch("subscriptionPlan");
  const paymentMethod = watch("paymentMethod");
  const newsletter = watch("newsletter");

  const onSubmit = (data: ConditionalFormData) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  const handleAccountTypeChange = (value: "personal" | "business" | "") => {
    setValue("accountType", value);
    // アカウントタイプが変わったら関連フィールドをクリア
    if (value !== "business") {
      setValue("businessName", undefined);
      setValue("businessType", undefined);
      setValue("taxId", undefined);
      setValue("employeeCount", undefined);
    }
    if (value !== "personal") {
      setValue("personalName", undefined);
      setValue("age", undefined);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton href="/patterns" />

      <PageHeader
        title="条件付きフォーム表示の実装パターン"
        subtitle="watchを使用して特定のフィールドの値に応じて他のフィールドを表示・非表示する方法を学習します"
      />

      <Spacer size={32} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              実装例：アカウント登録フォーム
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset" error={!!errors.accountType}>
                  <FormLabel component="legend">アカウントタイプ *</FormLabel>
                  <Controller
                    name="accountType"
                    control={control}
                    rules={{ required: "アカウントタイプを選択してください" }}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        onChange={(e) =>
                          handleAccountTypeChange(e.target.value as any)
                        }
                      >
                        <FormControlLabel
                          value="personal"
                          control={<Radio />}
                          label="個人アカウント"
                        />
                        <FormControlLabel
                          value="business"
                          control={<Radio />}
                          label="法人アカウント"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.accountType && (
                    <Typography color="error" variant="caption">
                      {errors.accountType.message}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              {/* 法人情報 */}
              <Collapse in={accountType === "business"}>
                <Card sx={{ mb: 3, bgcolor: "action.hover" }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      法人情報
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <Controller
                          name="businessName"
                          control={control}
                          rules={
                            accountType === "business"
                              ? { required: "会社名は必須です" }
                              : {}
                          }
                          render={({ field, fieldState: { error } }) => (
                            <TextField
                              {...field}
                              label="会社名"
                              fullWidth
                              size="small"
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel>法人格</InputLabel>
                          <Controller
                            name="businessType"
                            control={control}
                            render={({ field }) => (
                              <Select {...field} label="法人格">
                                {businessTypes.map((type) => (
                                  <MenuItem key={type} value={type}>
                                    {type}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                          name="taxId"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="税務番号"
                              fullWidth
                              size="small"
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Controller
                          name="employeeCount"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="従業員数"
                              type="number"
                              fullWidth
                              size="small"
                              inputProps={{ min: 1 }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Collapse>

              {/* 個人情報 */}
              <Collapse in={accountType === "personal"}>
                <Card sx={{ mb: 3, bgcolor: "action.hover" }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      個人情報
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <Controller
                          name="personalName"
                          control={control}
                          rules={
                            accountType === "personal"
                              ? { required: "名前は必須です" }
                              : {}
                          }
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
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Controller
                          name="age"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="年齢"
                              type="number"
                              fullWidth
                              size="small"
                              inputProps={{ min: 13, max: 120 }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Collapse>

              {/* 経験有無 */}
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="hasExperience"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value} onChange={onChange} />}
                      label="プログラミング経験がある"
                    />
                  )}
                />
              </Box>

              {/* 経験年数と言語 */}
              <Collapse in={hasExperience}>
                <Card sx={{ mb: 3, bgcolor: "primary.50" }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      経験について
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Controller
                        name="experienceYears"
                        control={control}
                        rules={
                          hasExperience
                            ? {
                                required: "経験年数は必須です",
                                min: {
                                  value: 0.1,
                                  message: "0.1年以上を入力してください",
                                },
                              }
                            : {}
                        }
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="経験年数"
                            type="number"
                            size="small"
                            inputProps={{ step: 0.1, min: 0.1 }}
                            error={!!error}
                            helperText={error?.message}
                            sx={{ width: 200 }}
                          />
                        )}
                      />
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      経験のあるプログラミング言語（複数選択可）
                    </Typography>
                    <Controller
                      name="programmingLanguages"
                      control={control}
                      render={({ field: { value = [], onChange } }) => (
                        <FormGroup row>
                          {programmingLanguages.map((lang) => (
                            <FormControlLabel
                              key={lang}
                              control={
                                <Checkbox
                                  checked={value.includes(lang)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      onChange([...value, lang]);
                                    } else {
                                      onChange(value.filter((l) => l !== lang));
                                    }
                                  }}
                                />
                              }
                              label={lang}
                              sx={{ minWidth: 140 }}
                            />
                          ))}
                        </FormGroup>
                      )}
                    />
                  </CardContent>
                </Card>
              </Collapse>

              {/* サブスクリプションプラン */}
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>サブスクリプションプラン *</InputLabel>
                  <Controller
                    name="subscriptionPlan"
                    control={control}
                    rules={{ required: "プランを選択してください" }}
                    render={({ field }) => (
                      <Select {...field} label="サブスクリプションプラン *">
                        <MenuItem value="free">無料プラン</MenuItem>
                        <MenuItem value="basic">
                          ベーシックプラン (¥500/月)
                        </MenuItem>
                        <MenuItem value="premium">
                          プレミアムプラン (¥1000/月)
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.subscriptionPlan && (
                  <Typography color="error" variant="caption">
                    {errors.subscriptionPlan.message}
                  </Typography>
                )}
              </Box>

              {/* 支払い方法 */}
              <Collapse
                in={subscriptionPlan !== "free" && subscriptionPlan !== ""}
              >
                <Card sx={{ mb: 3, bgcolor: "warning.50" }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      支払い情報
                    </Typography>
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel component="legend">支払い方法</FormLabel>
                      <Controller
                        name="paymentMethod"
                        control={control}
                        rules={
                          subscriptionPlan !== "free" && subscriptionPlan !== ""
                            ? { required: "支払い方法を選択してください" }
                            : {}
                        }
                        render={({ field }) => (
                          <RadioGroup {...field} row>
                            <FormControlLabel
                              value="credit"
                              control={<Radio />}
                              label="クレジットカード"
                            />
                            <FormControlLabel
                              value="bank"
                              control={<Radio />}
                              label="銀行振込"
                            />
                          </RadioGroup>
                        )}
                      />
                    </FormControl>

                    {paymentMethod === "credit" && (
                      <Controller
                        name="creditCardNumber"
                        control={control}
                        rules={{ required: "クレジットカード番号は必須です" }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="クレジットカード番号"
                            fullWidth
                            size="small"
                            error={!!error}
                            helperText={error?.message}
                            inputProps={{ maxLength: 16 }}
                          />
                        )}
                      />
                    )}

                    {paymentMethod === "bank" && (
                      <Controller
                        name="bankAccountNumber"
                        control={control}
                        rules={{ required: "銀行口座番号は必須です" }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="銀行口座番号"
                            fullWidth
                            size="small"
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  </CardContent>
                </Card>
              </Collapse>

              {/* メール配信設定 */}
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="newsletter"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value} onChange={onChange} />}
                      label="ニュースレターを受け取る"
                    />
                  )}
                />

                <Collapse in={newsletter}>
                  <Box sx={{ ml: 4, mt: 1 }}>
                    <Controller
                      name="marketingEmails"
                      control={control}
                      render={({ field: { value = false, onChange } }) => (
                        <FormControlLabel
                          control={
                            <Checkbox checked={value} onChange={onChange} />
                          }
                          label="マーケティングメールも受け取る"
                        />
                      )}
                    />
                  </Box>
                </Collapse>
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
            <pre
              style={{ fontSize: "0.7rem", overflow: "auto", maxHeight: 400 }}
            >
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </Paper>

          {submittedData && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                送信されたデータ
              </Typography>
              <pre
                style={{ fontSize: "0.7rem", overflow: "auto", maxHeight: 400 }}
              >
                {JSON.stringify(submittedData, null, 2)}
              </pre>
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
            <strong>watch の使用:</strong>
            <br />
            特定のフィールドの値を監視し、その値に応じて条件分岐を行います。リアルタイムで値の変更を検知できます。
          </Typography>
        </Alert>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Collapse コンポーネント:</strong>
            <br />
            MUIのCollapseコンポーネントを使用することで、スムーズなアニメーションでフィールドの表示・非表示を切り替えられます。
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>条件付きバリデーション:</strong>
            <br />
            rulesプロパティに条件を含めることで、表示されているフィールドのみにバリデーションを適用できます。
          </Typography>
        </Alert>

        <Alert severity="error">
          <Typography variant="body2">
            <strong>フィールドのクリア:</strong>
            <br />
            条件が変わった時にsetValueを使用して関連するフィールドをクリアすることで、不整合なデータの送信を防げます。
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
}
