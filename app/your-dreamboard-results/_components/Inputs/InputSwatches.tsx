'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import cn from '@/utils/cn';

interface IComponentProps {
  className?: string;
  name?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  max?: number;
}

const InputSwatches = ({
  className,
  value,
  onChange,
  max = 5,
}: IComponentProps) => {
  const [previews, setPreviews] = useState<Array<string | null>>(
    Array(max).fill(null),
  );
  const [filesLocal, setFilesLocal] = useState<Array<File | null>>(
    Array(max).fill(null),
  );
  const objectUrlsRef = useRef<Set<string>>(new Set());

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (!file) return;
      const nextUrl = URL.createObjectURL(file);
      setPreviews((current) => {
        const next = [...current];
        const previousUrl = next[index];
        if (previousUrl) {
          try {
            URL.revokeObjectURL(previousUrl);
          } catch {}
          objectUrlsRef.current.delete(previousUrl);
        }
        objectUrlsRef.current.add(nextUrl);
        next[index] = nextUrl;
        return next;
      });
      const nextFiles = [...filesLocal];
      nextFiles[index] = file;
      setFilesLocal(nextFiles);
      onChange?.(nextFiles.filter(Boolean) as File[]);
    };

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      objectUrlsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    // Sync previews from incoming value
    if (!value) return;
    const nextFiles = Array(max).fill(null) as Array<File | null>;
    value.slice(0, max).forEach((f, i) => {
      nextFiles[i] = f;
    });
    setFilesLocal(nextFiles);
    setPreviews((prev) => {
      // revoke existing
      prev.forEach((url) => {
        if (url) {
          try {
            URL.revokeObjectURL(url);
          } catch {}
          objectUrlsRef.current.delete(url);
        }
      });
      const next = Array(max).fill(null) as Array<string | null>;
      nextFiles.forEach((f, i) => {
        if (f) {
          const u = URL.createObjectURL(f);
          objectUrlsRef.current.add(u);
          next[i] = u;
        }
      });
      return next;
    });
  }, [value, max]);

  return (
    <div className={cn('flex gap-[10px]', 'bg-[#f9f8f7]', className)}>
      {Array.from({ length: max }).map((_, index) => {
        const id = `swatch-input-${index}`;
        return (
          <div key={id} className="relative h-[88px] w-[88px]">
            <input
              id={id}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleChange(index)}
            />
            <label
              htmlFor={id}
              className={cn(
                'flex items-center justify-center',
                'h-full w-full rounded-[10px] bg-gray-200',
                'cursor-pointer overflow-hidden transition-colors hover:bg-gray-200',
                'relative',
              )}
            >
              {previews[index] ? (
                <Image
                  src={previews[index] as string}
                  alt={`swatch ${index + 1}`}
                  fill
                  sizes="88px"
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-medium text-[14px] text-gray-400">
                  {index + 1}
                </span>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default InputSwatches;
