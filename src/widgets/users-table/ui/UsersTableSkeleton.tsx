import { memo } from 'react';

const SKELETON_ROWS = 10;
const ROW_HEIGHT = 56;

const COL_WIDTHS = [220, 140, 140, 140, 70, 100, 80] as const;

export const UsersTableSkeleton = memo(function UsersTableSkeleton() {
  return (
    <div className="h-[calc(100vh-320px)] min-h-[400px] overflow-hidden rounded-lg border border-surface-200 bg-white">
      <table className="w-full min-w-[900px] table-fixed border-collapse">
        <colgroup>
          {COL_WIDTHS.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-surface-200 bg-surface-50/95">
            <th className="px-4 py-3 text-left">
              <div className="h-3 w-16 animate-pulse rounded bg-surface-200" />
            </th>
            <th className="px-4 py-3">
              <div className="h-3 w-24 animate-pulse rounded bg-surface-200" />
            </th>
            <th className="px-4 py-3">
              <div className="h-3 w-20 animate-pulse rounded bg-surface-200" />
            </th>
            <th className="px-4 py-3">
              <div className="h-3 w-16 animate-pulse rounded bg-surface-200" />
            </th>
            <th className="px-4 py-3">
              <div className="mx-auto h-3 w-10 animate-pulse rounded bg-surface-200" />
            </th>
            <th className="px-4 py-3">
              <div className="mx-auto h-3 w-16 animate-pulse rounded bg-surface-200" />
            </th>
            <th className="w-20 px-2 py-3" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <tr
              key={i}
              className="border-b border-surface-100"
              style={{ height: ROW_HEIGHT }}
            >
              <td className="px-4 align-middle">
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-surface-200" />
                  <div className="h-3 w-40 animate-pulse rounded bg-surface-100" />
                </div>
              </td>
              <td className="px-4 align-middle">
                <div className="h-4 w-28 animate-pulse rounded bg-surface-200" />
              </td>
              <td className="px-4 align-middle">
                <div className="h-4 w-24 animate-pulse rounded bg-surface-200" />
              </td>
              <td className="px-4 align-middle">
                <div className="h-4 w-28 animate-pulse rounded bg-surface-200" />
              </td>
              <td className="px-4 text-center align-middle">
                <div className="mx-auto h-4 w-8 animate-pulse rounded bg-surface-200" />
              </td>
              <td className="px-4 align-middle">
                <div className="mx-auto h-6 w-16 animate-pulse rounded-full bg-surface-200" />
              </td>
              <td className="px-2 align-middle">
                <div className="flex justify-end gap-1">
                  <div className="h-8 w-8 animate-pulse rounded bg-surface-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
