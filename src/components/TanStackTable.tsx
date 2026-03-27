import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  VisibilityState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useGetUsersQuery } from '../store/api';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Settings2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('company.name', {
    header: 'Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: info => info.getValue(),
  }),
];

function TanStackTable() {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [selectedColumns, setSelectedColumns] = React.useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleColumnSelection = (columnId: string) => {
    setSelectedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  // We'll manage pagination locally since the API is just mock data
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useGetUsersQuery({ 
    page: pageIndex + 1, 
    limit: pageSize 
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    state: {
      columnVisibility,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data ? Math.ceil(data.total / pageSize) : -1,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Typography variant="h4" className="font-bold text-gray-800">
          User Directory
        </Typography>
        <div className="flex gap-2">
          {Object.values(selectedColumns).some(Boolean) && (
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => setSelectedColumns({})}
            >
              Clear Column Selection
            </Button>
          )}
          <Button
            id="column-toggle-button"
            aria-controls={open ? 'column-toggle-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            startIcon={<Settings2 size={18} />}
            className="capitalize"
          >
            Manage Columns
          </Button>
          <Menu
            id="column-toggle-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className="p-2 min-w-[200px]">
              <Typography variant="overline" className="px-3 font-bold text-gray-500">
                Visible Columns
              </Typography>
              <FormGroup>
                {table.getAllLeafColumns().map(column => {
                  const header = column.columnDef.header;
                  const label = typeof header === 'string' ? header : column.id.split('_').join(' ').toUpperCase();
                  return (
                    <MenuItem key={column.id} disableGutters className="py-0 px-2 hover:bg-transparent">
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                          />
                        }
                        label={label}
                        className="w-full m-0"
                      />
                    </MenuItem>
                  );
                })}
              </FormGroup>
            </div>
          </Menu>
        </div>
      </div>

      <TableContainer component={Paper} className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead className="bg-gray-50/80 backdrop-blur-sm">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSelected = !!selectedColumns[header.column.id];
                  return (
                    <TableCell 
                      key={header.id} 
                      onClick={() => toggleColumnSelection(header.column.id)}
                      className="font-bold text-gray-600 border-b-2 transition-colors cursor-pointer select-none"
                      sx={{
                        backgroundColor: isSelected ? 'rgba(59, 105, 244, 0.15)' : 'inherit',
                        '&:hover': {
                          backgroundColor: isSelected ? 'rgba(59, 105, 244, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                        }
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} hover className="transition-colors group hover:bg-blue-50/30">
                  {row.getVisibleCells().map(cell => {
                    const isSelected = !!selectedColumns[cell.column.id];
                    return (
                      <TableCell 
                        key={cell.id} 
                        onClick={() => toggleColumnSelection(cell.column.id)}
                        className="text-gray-700 transition-colors cursor-pointer select-none"
                        sx={{
                          backgroundColor: isSelected ? 'rgba(59, 105, 244, 0.1)' : 'inherit',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" className="py-20 text-gray-400">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Custom Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t">
          <div className="flex items-center gap-2">
            <Typography variant="body2" className="text-gray-500">
              Show
            </Typography>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
              className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <Typography variant="body2" className="text-gray-500">
              users per page
            </Typography>
          </div>

          <div className="flex items-center gap-6">
            <Typography variant="body2" className="text-gray-600 font-medium">
              Page <span className="font-bold">{table.getState().pagination.pageIndex + 1}</span> of{' '}
              <span className="font-bold">{table.getPageCount()}</span>
            </Typography>
            <div className="flex items-center gap-1">
              <IconButton
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                size="small"
                className="hover:bg-blue-50 text-gray-600"
              >
                <ChevronsLeft size={20} />
              </IconButton>
              <IconButton
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                size="small"
                className="hover:bg-blue-50 text-gray-600"
              >
                <ChevronLeft size={20} />
              </IconButton>
              <IconButton
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                size="small"
                className="hover:bg-blue-50 text-gray-600"
              >
                <ChevronRight size={20} />
              </IconButton>
              <IconButton
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                size="small"
                className="hover:bg-blue-50 text-gray-600"
              >
                <ChevronsRight size={20} />
              </IconButton>
            </div>
          </div>
        </div>
      </TableContainer>
    </div>
  );
}

export default TanStackTable;
