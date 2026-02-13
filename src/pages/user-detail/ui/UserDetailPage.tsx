import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useUserDetail, useUpdateUser, useDeleteUser } from '@/features/users/model';
import { StatusBadge } from '@/entities/user';
import type { User } from '@/entities/user';

const ROLES = [
  'Content Creator',
  'IT Administrator',
  'Marketing Manager',
  'Sales Representative',
  'Product Manager',
  'Software Engineer',
  'Data Analyst',
  'Customer Support',
];

const COUNTRIES = ['Sweden', 'United States', 'United Kingdom', 'Germany', 'France'];

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUserDetail(id ?? null);
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser(() => navigate('/'));

  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) setForm({ ...user });
  }, [user]);

  const handleChange = (field: keyof User) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === 'checkbox'
        ? target.checked
        : target.type === 'number'
          ? (target.value ? parseInt(target.value, 10) : undefined)
          : target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = () => {
    if (!id) return;
    const { createdAt, updatedAt, ...data } = form as User & { createdAt?: Date; updatedAt?: Date };
    updateMutation.mutate(
      {
        id,
        data: {
          ...data,
          banned: form.banned,
        },
      },
      {
        onSuccess: () => {},
        onError: () => {},
      }
    );
  };

  const handleDelete = () => {
    if (!id || !confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    deleteMutation.mutate(id);
  };

  if (!id) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
        <p className="text-rose-700">Invalid user ID</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to users
        </Link>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg p-2 text-gray-600 transition-colors hover:bg-surface-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="h-6 w-px bg-surface-200" />
          <div>
            <h1 className="font-display text-xl font-semibold text-gray-900">
              Edit user
            </h1>
            <p className="text-sm text-gray-500">
              {user?.fullName ?? 'Loading...'}
            </p>
          </div>
          {user && <StatusBadge status={user.status} />}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center rounded-xl border border-surface-200 bg-white py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
          <p className="text-rose-700">Failed to load user. Please try again.</p>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to users
          </Link>
        </div>
      )}

      {user && !isLoading && (
        <div className="rounded-xl border border-surface-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="mb-6 flex items-center gap-4 rounded-lg bg-surface-50/80 px-4 py-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!form.banned}
                  onChange={handleChange('banned')}
                  className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm font-medium text-gray-700">Banned</span>
              </label>
              <span className="text-xs text-gray-500">— Apply disable account</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  value={form.fullName ?? ''}
                  onChange={handleChange('fullName')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  value={form.email ?? ''}
                  onChange={handleChange('email')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone number</label>
                <input
                  type="text"
                  value={form.phoneNumber ?? ''}
                  onChange={handleChange('phoneNumber')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Country</label>
                <select
                  value={form.country ?? ''}
                  onChange={handleChange('country')}
                  className={inputClass}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">State/region</label>
                <input
                  type="text"
                  value={form.stateRegion ?? ''}
                  onChange={handleChange('stateRegion')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={form.city ?? ''}
                  onChange={handleChange('city')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={form.address ?? ''}
                  onChange={handleChange('address')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Zip/code</label>
                <input
                  type="text"
                  value={form.zipCode ?? ''}
                  onChange={handleChange('zipCode')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={form.company ?? ''}
                  onChange={handleChange('company')}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={form.role ?? ''}
                  onChange={handleChange('role')}
                  className={inputClass}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={form.age ?? ''}
                  onChange={handleChange('age')}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-surface-200 bg-surface-50/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-50 sm:justify-start"
            >
              <Trash2 className="h-4 w-4" />
              Delete user
            </button>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-surface-100"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
          {updateMutation.isError && (
            <div className="border-t border-rose-200 bg-rose-50/50 px-6 py-3">
              <p className="text-sm text-rose-600">
                Update failed (simulated). Changes have been rolled back.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
