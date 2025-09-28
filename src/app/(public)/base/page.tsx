import { Container } from "@mui/material";

import PageHeader from "@/components/base/page-header";
import StepList from "@/components/base/step-list";
import Spacer from "@/components/layout/spacer";
import { steps } from "@/data/steps";

export default function Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="React Hook Form 基礎編"
        subtitle="このページではReact Hook Formの基本的なAPIを段階的に学習します"
      />

      <Spacer size={32} />

      <StepList steps={steps} />
    </Container>
  );
}
