import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetUsersQuery } from '../store/api';

const LIMIT = 100;
const ROW_HEIGHT = 50;
const TABLE_HEIGHT = 400;

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: Company;
  role: string;
}

const UserTable: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isFetching } = useGetUsersQuery({ page, limit: LIMIT });

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && page < Math.ceil(1000 / LIMIT)) {
      setPage(page + 1);
    }
  };

  const Row = React.useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const user = data?.users[index];
      if (!user) return null;

      return (
        <div 
          style={style}
          className={`
            flex items-center px-4 
            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            ${isFetching ? 'opacity-50' : 'opacity-100'}
            transition-opacity duration-200
          `}
        >
          <div className="w-1/4 py-3">{user.name}</div>
          <div className="w-1/4 py-3">{user.email}</div>
          <div className="w-1/4 py-3">{user.company.name}</div>
          <div className="w-1/4 py-3">{user.role}</div>
        </div>
      );
    },
    [data?.users, isFetching]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(1000 / LIMIT);
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table Header */}
      <div className="flex bg-gray-100 font-semibold text-gray-700">
        <div className="w-1/4 px-4 py-3">Name</div>
        <div className="w-1/4 px-4 py-3">Email</div>
        <div className="w-1/4 px-4 py-3">Company</div>
        <div className="w-1/4 px-4 py-3">Role</div>
      </div>

      {/* Virtualized Table Body */}
      <div className={`relative ${isFetching ? 'pointer-events-none' : ''}`}>
        <List
          height={TABLE_HEIGHT}
          itemCount={data?.users.length || 0}
          itemSize={ROW_HEIGHT}
          width="100%"
        >
          {Row}
        </List>
        {isFetching && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
        <div className="text-sm text-gray-700">
          Showing page {page} of {totalPages}
          <span className="ml-2 text-gray-500">
            (Total: 1000 users)
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={isFirstPage || isFetching}
            className={`
              p-2 rounded-md transition-all duration-200
              ${isFirstPage || isFetching
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
              }
            `}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextPage}
            disabled={isLastPage || isFetching}
            className={`
              p-2 rounded-md transition-all duration-200
              ${isLastPage || isFetching
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
              }
            `}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;