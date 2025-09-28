import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

import LinkButton from "@/components/LinkButton";
import HStack from "@/components/layout/h-stack";
import Spacer from "@/components/layout/spacer";
import VStack from "@/components/layout/v-stack";

export default function Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <VStack spacing={1}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Hook Form 基礎編
        </Typography>
        <Typography variant="h6" color="text.secondary">
          このページではReact Hook Formの基本的なAPIを段階的に学習します
        </Typography>
      </VStack>

      <Spacer size={32} />

      <Typography variant="h5" gutterBottom>
        学習ステップ
      </Typography>

      <Spacer size={24} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <HStack spacing={1}>
                <CodeIcon color="primary" />
                <Typography variant="h6" component="h2">
                  Step 1: register API
                </Typography>
              </HStack>

              <Spacer size={16} />

              <Typography variant="body2" color="text.secondary">
                React Hook Formの基本となるregister APIの使い方を学びます。
                フィールドの登録からバリデーション、エラーハンドリングまで段階的に習得できます。
              </Typography>

              <Spacer size="auto" />

              <LinkButton
                href="/base/step/1"
                variant="contained"
                color="primary"
                startIcon={<SchoolIcon />}
              >
                学習を始める
              </LinkButton>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: 0.7,
            }}
          >
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <HStack spacing={1}>
                <CodeIcon color="disabled" />
                <Typography variant="h6" component="h2" color="text.secondary">
                  Step 2: バリデーション (準備中)
                </Typography>
              </HStack>

              <Spacer size={16} />

              <Typography variant="body2" color="text.secondary">
                より高度なバリデーション手法を学びます。
                カスタムバリデーション、非同期バリデーションなど。
              </Typography>

              <Spacer size="auto" />

              <LinkButton variant="outlined" color="inherit" disabled>
                Coming Soon
              </LinkButton>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: 0.7,
            }}
          >
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <HStack spacing={1}>
                <CodeIcon color="disabled" />
                <Typography variant="h6" component="h2" color="text.secondary">
                  Step 3: フォーム送信 (準備中)
                </Typography>
              </HStack>

              <Spacer size={16} />

              <Typography variant="body2" color="text.secondary">
                フォームデータの送信、リセット、動的フィールドの管理方法を学びます。
              </Typography>

              <Spacer size="auto" />

              <LinkButton variant="outlined" color="inherit" disabled>
                Coming Soon
              </LinkButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
