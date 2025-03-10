import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetUsersQuery } from '../store/api';

const LIMIT = 100;
const ROW_HEIGHT = 50;
const TABLE_HEIGHT = 400;
const VISIBLE_PAGES = 5; // Number of page buttons to show

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
  // Get page from URL query string
  const getInitialPage = () => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    return pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  };

  const [page, setPage] = React.useState(getInitialPage);
  const { data, isLoading, isFetching } = useGetUsersQuery({ page, limit: LIMIT });

  // Update URL when page changes
  React.useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(VISIBLE_PAGES / 2);
    let start = Math.max(1, page - halfVisible);
    let end = Math.min(totalPages, start + VISIBLE_PAGES - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < VISIBLE_PAGES) {
      start = Math.max(1, end - VISIBLE_PAGES + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

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
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(1)}
            disabled={isFirstPage || isFetching}
            className={`
              px-3 py-1 rounded-md text-sm transition-all duration-200
              ${isFirstPage || isFetching
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95'
              }
            `}
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={isFirstPage || isFetching}
            className={`
              p-2 rounded-md transition-all duration-200
              ${isFirstPage || isFetching
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95'
              }
            `}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Numbered page buttons */}
          {visiblePages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={isFetching}
              className={`
                px-3 py-1 rounded-md text-sm transition-all duration-200
                ${pageNum === page
                  ? 'bg-blue-500 text-white'
                  : isFetching
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95'
                }
              `}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={isLastPage || isFetching}
            className={`
              p-2 rounded-md transition-all duration-200
              ${isLastPage || isFetching
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95'
              }
            `}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={isLastPage || isFetching}
            className={`
              px-3 py-1 rounded-md text-sm transition-all duration-200
              ${isLastPage || isFetching
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95'
              }
            `}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;