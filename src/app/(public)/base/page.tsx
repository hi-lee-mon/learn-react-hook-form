import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import LinkButton from "@/components/LinkButton";

export default function Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Hook Form 基礎編
        </Typography>
        <Typography variant="h6" color="text.secondary">
          このページではReact Hook Formの基本的なAPIを段階的に学習します
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        学習ステップ
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CodeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Step 1: register API
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                React Hook Formの基本となるregister APIの使い方を学びます。
                フィールドの登録からバリデーション、エラーハンドリングまで段階的に習得できます。
              </Typography>
              <Box sx={{ mt: "auto" }}>
                <LinkButton
                  href="/base/step/1"
                  variant="contained"
                  color="primary"
                  startIcon={<SchoolIcon />}
                >
                  学習を始める
                </LinkButton>
              </Box>
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
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CodeIcon color="disabled" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2" color="text.secondary">
                  Step 2: バリデーション (準備中)
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                より高度なバリデーション手法を学びます。
                カスタムバリデーション、非同期バリデーションなど。
              </Typography>
              <Box sx={{ mt: "auto" }}>
                <LinkButton variant="outlined" color="inherit" disabled>
                  Coming Soon
                </LinkButton>
              </Box>
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
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CodeIcon color="disabled" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2" color="text.secondary">
                  Step 3: フォーム送信 (準備中)
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                フォームデータの送信、リセット、動的フィールドの管理方法を学びます。
              </Typography>
              <Box sx={{ mt: "auto" }}>
                <LinkButton variant="outlined" color="inherit" disabled>
                  Coming Soon
                </LinkButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
