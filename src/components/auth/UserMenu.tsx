import { LogOut, User as UserIcon, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useOverlays } from "@/store/overlays-store";

export function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const { openAuth } = useOverlays();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openAuth("login")}>
          Entrar
        </Button>
        <Button size="sm" onClick={() => openAuth("signup")}>
          Criar conta
        </Button>
      </div>
    );
  }

  const name = profile?.display_name || user.email?.split("@")[0] || "Você";
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 transition hover:border-primary">
          <Avatar className="h-7 w-7">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={name} />}
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden pr-1 text-sm font-medium sm:inline">{name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {profile?.active_plan ? `Plano ${profile.active_plan}` : "Plano Gratuito"}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/meus-agendamentos" className="cursor-pointer">
            <Receipt className="mr-2 h-4 w-4" /> Meus Agendamentos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/painel" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" /> Painel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
