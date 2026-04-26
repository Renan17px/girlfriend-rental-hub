"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Filter, MessageCircle, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  brazilStates,
  citiesByState,
  hobbiesList,
  searchProfiles,
  type SearchProfile,
} from "@/lib/mock-data";

type SortOption = "relevancia" | "novas" | "avaliadas" | "proximas";

export function SearchPage() {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [distanceKm, setDistanceKm] = useState<number>(50);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 35]);
  const [heightRange, setHeightRange] = useState<[number, number]>([150, 190]);
  const [minPhotos, setMinPhotos] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [searchTerm, setSearchTerm] = useState("");

  const cities = citiesByState[state] ?? [];

  const filtered = useMemo(() => {
    let data = [...searchProfiles];

    data = data.filter((profile) => {
      if (state && profile.state !== state) return false;
      if (city && profile.city !== city) return false;
      if (profile.distanceKm > distanceKm) return false;
      if (profile.age < ageRange[0] || profile.age > ageRange[1]) return false;
      if (profile.heightCm < heightRange[0] || profile.heightCm > heightRange[1]) return false;
      if (profile.photosCount < minPhotos) return false;
      if (onlyVerified && !profile.verified) return false;
      if (onlyOnline && !profile.online) return false;
      if (selectedHobbies.length && !selectedHobbies.every((h) => profile.tags.includes(h))) {
        return false;
      }
      if (
        searchTerm &&
        !`${profile.name} ${profile.city} ${profile.tags.join(" ")}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    const sorters: Record<SortOption, (a: SearchProfile, b: SearchProfile) => number> = {
      relevancia: (a, b) => b.rating - a.rating,
      novas: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      avaliadas: (a, b) => b.rating - a.rating,
      proximas: (a, b) => a.distanceKm - b.distanceKm,
    };

    data.sort(sorters[sort]);
    return data;
  }, [
    state,
    city,
    distanceKm,
    ageRange,
    heightRange,
    minPhotos,
    onlyVerified,
    onlyOnline,
    selectedHobbies,
    sort,
    searchTerm,
  ]);

  const visibleProfiles = filtered.slice(0, visibleCount);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold">Minha Namorada</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>
              <Link href="/">Inicio</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/cadastro">Criar conta</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/painel">Painel</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/pagamentos">Pagamentos</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/verificacao">Verificacao</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/chat">Chat</Link>
            </Button>
          </div>
        </div>
        <h1 className="text-3xl font-semibold md:text-4xl">Buscar companhia</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Use os filtros para encontrar perfis alinhados ao seu estilo.
        </p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
          <Search className="h-5 w-5" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nome, cidade ou interesse"
            className="w-full bg-transparent text-sm outline-none placeholder:text-rose-50/80"
          />
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-3xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <select
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                  setCity("");
                }}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {brazilStates.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                disabled={!state}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              >
                <option value="">Todas</option>
                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <RangeField
              label={`Proximidade: ate ${distanceKm} km`}
              min={5}
              max={100}
              value={distanceKm}
              onChange={setDistanceKm}
            />
            <RangeField
              label={`Idade minima: ${ageRange[0]} anos`}
              min={18}
              max={60}
              value={ageRange[0]}
              onChange={(value) => setAgeRange([value, ageRange[1]])}
            />
            <RangeField
              label={`Idade maxima: ${ageRange[1]} anos`}
              min={18}
              max={60}
              value={ageRange[1]}
              onChange={(value) => setAgeRange([ageRange[0], value])}
            />
            <RangeField
              label={`Altura minima: ${(heightRange[0] / 100).toFixed(2)}m`}
              min={150}
              max={190}
              value={heightRange[0]}
              onChange={(value) => setHeightRange([value, heightRange[1]])}
            />
            <RangeField
              label={`Altura maxima: ${(heightRange[1] / 100).toFixed(2)}m`}
              min={150}
              max={190}
              value={heightRange[1]}
              onChange={(value) => setHeightRange([heightRange[0], value])}
            />
            <RangeField
              label={`Minimo de fotos: ${minPhotos}`}
              min={0}
              max={10}
              value={minPhotos}
              onChange={setMinPhotos}
            />

            <ToggleField
              label="Apenas verificadas"
              checked={onlyVerified}
              onChange={setOnlyVerified}
            />
            <ToggleField label="Apenas online agora" checked={onlyOnline} onChange={setOnlyOnline} />

            <div className="space-y-2">
              <label className="text-sm font-medium">Hobbies e interesses</label>
              <div className="flex flex-wrap gap-2">
                {hobbiesList.map((hobby) => {
                  const checked = selectedHobbies.includes(hobby);
                  return (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() =>
                        setSelectedHobbies((prev) =>
                          checked ? prev.filter((item) => item !== hobby) : [...prev, hobby],
                        )
                      }
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background"
                      }`}
                    >
                      {hobby}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenacao</label>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="relevancia">Relevancia</option>
                <option value="novas">Mais novas</option>
                <option value="avaliadas">Melhor avaliadas</option>
                <option value="proximas">Mais proximas</option>
              </select>
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} perfil{filtered.length !== 1 ? "is" : ""} encontrados
          </p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProfiles.map((profile) => (
              <motion.article
                key={profile.id}
                layout
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={profile.image}
                    alt={`Perfil ${profile.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {profile.name}, {profile.age}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {profile.city} - {profile.state} ({profile.distanceKm}km)
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {profile.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Badge status={profile.verified} text="Verificada" />
                    <Badge status={profile.online} text="Online" />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/perfil/${profile.id}`}>Ver perfil</Link>
                    </Button>
                    <Button variant="secondary" className="flex-1" asChild>
                      <Link href="/chat">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        Chat
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="pt-2">
              <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 6)}>
                Ver mais
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function RangeField({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
    >
      {label}
      {checked ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4" />}
    </button>
  );
}

function Badge({ status, text }: { status: boolean; text: string }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs ${
        status ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground"
      }`}
    >
      {text}
    </span>
  );
}
