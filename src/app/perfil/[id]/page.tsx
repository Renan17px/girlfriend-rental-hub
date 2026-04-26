import { notFound } from "next/navigation";
import { ProfilePage } from "@/components/profile/profile-page";
import { getProfileDetails } from "@/lib/profile-mock";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PerfilPage({ params }: Props) {
  const { id } = await params;
  const profile = getProfileDetails(id);

  if (!profile) {
    notFound();
  }

  return <ProfilePage profile={profile} />;
}
