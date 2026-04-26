"use client";

import Link from "next/link";
import { Database, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrivacyPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/termos">Termos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/denuncias">Denuncias</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Politica de privacidade</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Transparencia no tratamento de dados pessoais em conformidade com a LGPD.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <Database className="h-4 w-4 text-primary" />
            Dados coletados
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Coletamos dados cadastrais, informacoes de uso, historico de pagamentos e dados de verificacao para seguranca da plataforma.
          </p>
        </article>
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <Lock className="h-4 w-4 text-primary" />
            Protecao e criptografia
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Dados sensiveis sao protegidos com controles de acesso, criptografia e boas praticas de seguranca em ambiente HTTPS.
          </p>
        </article>
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Finalidade e consentimento
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            O uso de dados ocorre para funcionamento da plataforma, verificacao de autenticidade, prevencao de fraude e cumprimento legal.
          </p>
        </article>
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <Trash2 className="h-4 w-4 text-primary" />
            Exclusao de dados
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Voce pode solicitar exclusao da conta e dos dados pessoais pelo painel. O processo segue requisitos legais e auditoria.
          </p>
        </article>
      </section>
    </main>
  );
}
