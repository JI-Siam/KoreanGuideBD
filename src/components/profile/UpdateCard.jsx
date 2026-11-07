'use client'

import { useForm } from "react-hook-form";
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import Link from 'next/link';

const UpdateCard = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleUpdate = async (data) => {
    const { name, image } = data;

    const { data: res, error } = await authClient.updateUser({
      image: image,
      name: name,
    });

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      toast.success("Profile Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 pt-32 pb-20 bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      <div className="w-full max-w-md border border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-accent-green)]">
            Account Management
          </span>
          <Link href="/profile" className="text-xs font-mono text-[var(--color-muted-text)] hover:underline">
            ← Cancel
          </Link>
        </div>
        <h2 className="text-2xl font-black font-inter tracking-tight text-[var(--color-primary-text)] mb-6">
          Update Profile Information
        </h2>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">
              Full Legal Name
            </label>
            <input
              defaultValue={user?.name}
              type="text"
              {...register("name", { required: "*Name Required" })}
              className="w-full border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-4 py-3 text-sm text-[var(--color-primary-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)]"
              placeholder={user?.name}
            />
            {errors.name && <p className="text-[var(--color-destructive)] text-xs font-mono">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">
              Avatar Asset URL
            </label>
            <input
              defaultValue={user?.image}
              type="text"
              {...register("image", { required: "*URL Required" })}
              className="w-full border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-4 py-3 text-sm text-[var(--color-primary-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)]"
              placeholder="https://..."
            />
            {errors.image && <p className="text-[var(--color-destructive)] text-xs font-mono">{errors.image.message}</p>}
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="btn btn-black w-full py-3.5 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              Save Profile Records →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCard;
