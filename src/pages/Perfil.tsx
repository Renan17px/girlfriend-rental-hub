import { useParams, Navigate } from "react-router-dom";
import { ProfilePage } from "@/components/profile/profile-page";
import { getProfileDetails } from "@/lib/profile-mock";

const Perfil = () => {
  const { id } = useParams<{ id: string }>();
  const profile = id ? getProfileDetails(id) : undefined;

  if (!profile) return <Navigate to="/404" replace />;

  return <ProfilePage profile={profile} />;
};

export default Perfil;
