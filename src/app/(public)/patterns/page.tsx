import { Container } from "@mui/material";

import PageHeader from "@/components/base/page-header";
import Spacer from "@/components/layout/spacer";
import PatternList from "@/components/patterns/pattern-list";
import { patterns } from "@/data/patterns";

export default function Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="React Hook Form 実装パターン"
        subtitle="実際の開発でよく使われるReact Hook Formの実装パターンを学習します。各パターンにはサンプルコードと解説が含まれています。"
      />

      <Spacer size={32} />

      <PatternList patterns={patterns} />
    </Container>
  );
}
