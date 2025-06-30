import AdminForm from './admin-form';
import { getRawDataForAdmin } from '@/lib/data';

export default async function AdminPage() {
  const initialPortfolioData = await getRawDataForAdmin();
  return <AdminForm initialData={initialPortfolioData} />;
}
