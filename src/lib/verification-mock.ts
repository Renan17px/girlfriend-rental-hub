export type VerificationStepStatus = "pending" | "in_progress" | "done";

export type VerificationStep = {
  id: string;
  title: string;
  description: string;
  status: VerificationStepStatus;
};

export const initialVerificationSteps: VerificationStep[] = [
  {
    id: "email",
    title: "Verificacao de e-mail",
    description: "Confirme o link enviado para seu e-mail.",
    status: "in_progress",
  },
  {
    id: "phone",
    title: "Verificacao de telefone (OTP)",
    description: "Digite o codigo SMS de 6 digitos.",
    status: "pending",
  },
  {
    id: "document",
    title: "Upload de documento (RG/CNH)",
    description: "Envie frente e verso com boa iluminacao.",
    status: "pending",
  },
  {
    id: "face",
    title: "Selfie com liveness",
    description: "Piscar e virar o rosto para autenticacao.",
    status: "pending",
  },
  {
    id: "analysis",
    title: "Analise IA + revisao humana",
    description: "Prazo estimado de ate 48 horas.",
    status: "pending",
  },
];
