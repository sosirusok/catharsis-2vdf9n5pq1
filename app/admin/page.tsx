import { getAdmin } from "@/lib/admin";
import AdminAccessGate from "./AdminAccessGate";
import AdminApp from "./AdminApp";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdmin();
  return admin ? <AdminApp /> : <AdminAccessGate />;
}
