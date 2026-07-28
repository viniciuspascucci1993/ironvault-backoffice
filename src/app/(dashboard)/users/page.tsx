import UsersTable from "@/components/ui/UsersTable";
import { getServerApi } from "@/lib/serverApi";
import { MerchantProfile, User } from "@/types";

export default async function UsersPage() {
  const api = await getServerApi();
  const res = await api.get<User[]>("/api/users");
  const users = res.data;

  // Busca perfis dos merchants em paralelo
  const merchantProfiles = await Promise.all(
    users
      .filter(u => u.role === 'MERCHANT')
      .map(async u => {
        try {
          const res = await api.get<MerchantProfile>(`/api/merchants/profile/${u.id}`)
          return res.data
        } catch {
          return null
        }
      })
  )

  const profilesByUserId = merchantProfiles
    .filter(Boolean)
    .reduce((acc, profile) => {
      if (profile) acc[profile.userId] = profile
      return acc
    }, {} as Record<string, MerchantProfile>)

  return <UsersTable users={users} merchantProfiles={profilesByUserId}/>;
}
