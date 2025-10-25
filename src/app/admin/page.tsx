
import { getRawDataForAdmin } from '@/lib/data';
import AdminPageClient from './admin-page-client';

export default async function AdminPage() {
    const initialData = await getRawDataForAdmin();
    return <AdminPageClient initialData={initialData} />;
}
