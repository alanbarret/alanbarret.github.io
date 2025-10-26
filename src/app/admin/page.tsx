
import AdminPageClient from './admin-page-client';

export default async function AdminPage() {
    // This page is now a simple wrapper. 
    // Data fetching and auth checking are handled on the client.
    return <AdminPageClient />;
}
