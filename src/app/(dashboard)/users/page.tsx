import UsersTable from "@/components/ui/UsersTable";
import { getServerApi } from "@/lib/serverApi";
import { User } from "@/types";

export default async function UsersPage() {
  const api = await getServerApi();
  const res = await api.get<User[]>("/api/users");
  const users = res.data;

  return <UsersTable users={users} />;
}
