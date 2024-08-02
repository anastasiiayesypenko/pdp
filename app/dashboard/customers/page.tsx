import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages } from '@/app/lib/data';
import Table from '@/app/ui/customers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

const skeletonHeaderColumns = [
  { title: 'Name', className: 'px-4 py-5 font-medium sm:pl-6' },
  { title: 'Email', className: 'px-3 py-5 font-medium' },
  { title: 'Total Invoices', className: 'px-3 py-5 font-medium' },
  { title: 'Total Pending', className: 'px-3 py-5 font-medium' },
  { title: 'Total Paid', className: 'px-4 py-5 font-medium' },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton headerColumns={skeletonHeaderColumns} />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
