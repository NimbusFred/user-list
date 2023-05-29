import { Cell, Column, HeaderGroup, Row, useFilters, useTable, useSortBy, useGlobalFilter, useAsyncDebounce, TableInstance } from 'react-table';
import React, { useState } from 'react';

// Rozhraní definující vlastnosti potřebné pro DataTable komponentu
interface Props<T extends object, C extends readonly Column<T>[]> {
  columns: C;
  data: Array<T>;
}

// Rozhraní definující vlastnosti potřebné pro GlobalFilter komponentu
interface GlobalFilterProps<T extends object> {
  preGlobalFilteredRows: Row<T>[];
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}

// Rozhraní definující vlastnosti potřebné pro ColumnFilter komponentu
interface ColumnFilterProps {
  column: {
    filterValue?: string;
    preFilteredRows: any[];
    setFilter: (value?: string | undefined) => void;
  };
}

// Komponenta představující filtr, který umožňuje hledat v celé tabulce najednou
function GlobalFilter<T extends object>({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}: GlobalFilterProps<T>) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  // Použití debounce na zmenšení počtu dotazů na hledání
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <></>
  );
}


// Výchozí filtr sloupce
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: ColumnFilterProps) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className='px-2 py-1 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md text-center'
    />
  );
}




/** Komponenta představující tabulku se sloupci a daty */
export default function DataTable<T extends object, C extends Column<T>[]>({ columns, data }: Props<T, C>) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows: Row<T>[], id: any, filterValue: any) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  // Výchozí nastavení pro sloupec
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

  // Použití React Table hooků a vytvoření instanci tabulky
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  }: TableInstance<T> = useTable<T>(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );


  // Nastavení počtu položek na stránku a indexu stránky
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  // Funkce pro změnu počtu položek na stránku
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  };

  // Vypočítání celkového počtu stránek
  const pageCount = Math.ceil(rows.length / pageSize);

  // Vykreslení tabulky s možností stránkování, filtrování a vyhledávání

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        {/* Dropdown pro změnu počtu položek na stránku */}
        <select
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-500"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="inline-block min-w-full overflow-hidden">
        <table className="min-w-full" {...getTableBodyProps()}>
          {/* Hlavička tabulky */}
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<T>, headerIdx: number) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerIdx}>
                  {/* Vykreslení sloupců */}
                  {headerGroup.headers.map((column: HeaderGroup<T>, colIdx: number) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center"
                      key={colIdx}
                    >
                      {/* Název sloupce a možnost filtrování a řazení */}
                      <div className="inline-flex flex-col items-center">
                        {column.render('Header')}
                        <div>
                          <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </div>
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </div>
                    </th>
                  ))}
                  {/* Řádek pro celkové vyhledávání v tabulce */}
                </tr>
              );
            })}
            <tr>
              <th
                colSpan={visibleColumns.length}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          {/* Tělo tabulky */}
          <tbody {...getTableBodyProps()}>
            {rows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map((row: Row<T>, rowIdx: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`row-${rowIdx}`}>
                  {/* Vykreslení tabulky pomocí dat z React Table API */}
                  {row.cells.map((cell: Cell<T, any>, cellIdx: number) => {
                    return (
                      <td   {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center"
                        key={cellIdx}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Tlačítka pro navigaci mezi stránkami tabulky */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
        >
          {'<<'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          {'<'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {'>'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}
