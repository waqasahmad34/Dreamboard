'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import cn from '@/utils/cn';

type TOriginalSwatch = {
  id: string;
  url: string;
  child?: string;
  family?: string;
  filename?: string;
  combination_id?: string | number;
};

type TProps = {
  results: any[];
  swatchesMetadataArr?: Record<string, any>[];
  originalSwatches: TOriginalSwatch[];
};

export default function StickyNeighborSwatches({
  results,
  swatchesMetadataArr,
  originalSwatches,
}: TProps) {
  // Track if the section container is visible in viewport
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById('sticky-swatches-container');
      if (!el) {
        setIsContainerVisible(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      // Show when top <= 50 AND bottom >= 250
      const show = rect.top <= 50 && rect.bottom >= 250;
      setIsContainerVisible(show);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  // Map combination_id -> swatch child
  const combinationToChild = useMemo(() => {
    const map = new Map<number, string>();
    (results || [])
      ?.filter(
        (combination: any) =>
          combination.mood_board_url || combination.final_room_url,
      )
      .forEach((combination: any) => {
        const meta = swatchesMetadataArr?.find(
          (item: any) => item.combination_id === combination.combination_id,
        );
        if (meta?.child) {
          map.set(combination.combination_id, meta.child as string);
        }
      });
    return map;
  }, [results, swatchesMetadataArr]);

  const [activeCombinationId, setActiveCombinationId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll('[id^="combination-"]'),
    ) as HTMLElement[];
    if (targets.length === 0) return;

    let frameRequested = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idStr = visible.target.id.replace('combination-', '');
          const idNum = parseInt(idStr, 10);
          if (!Number.isNaN(idNum)) {
            if (!frameRequested) {
              frameRequested = true;
              requestAnimationFrame(() => {
                setActiveCombinationId((prev) => (prev === idNum ? prev : idNum));
                frameRequested = false;
              });
            }
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: [0.25, 0.5, 0.75] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  }, [results]);

  const activeChild = activeCombinationId
    ? combinationToChild.get(activeCombinationId) || null
    : null;

  const neighborChildren = useMemo(() => {
    if (!activeChild) return null;
    const lc = String(activeChild).toLowerCase();
    if (lc === 'charcoal') return { left: 'natural', right: 'appletini' };
    if (lc === 'natural') return { left: 'charcoal', right: 'appletini' };
    if (lc === 'appletini') return { left: 'natural', right: 'charcoal' };
    return null;
  }, [activeChild]);

  const leftSwatch = useMemo(() => {
    if (!neighborChildren) return null;
    return originalSwatches.find(
      (s) => String(s.child).toLowerCase() === neighborChildren.left,
    );
  }, [neighborChildren, originalSwatches]);

  const rightSwatch = useMemo(() => {
    if (!neighborChildren) return null;
    return originalSwatches.find(
      (s) => String(s.child).toLowerCase() === neighborChildren.right,
    );
  }, [neighborChildren, originalSwatches]);

  // Find target combination ids for neighbors to anchor-link to
  const leftTargetCombinationId = useMemo(() => {
    if (!neighborChildren) return null;
    const targetChild = neighborChildren.left;
    const match = (results || [])
      ?.filter(
        (combination: any) =>
          combination.mood_board_url || combination.final_room_url,
      )
      .find(
        (combination: any) =>
          String(combinationToChild.get(combination.combination_id) || '').toLowerCase() ===
          targetChild,
      );
    return match?.combination_id ?? null;
  }, [neighborChildren, results, combinationToChild]);

  const rightTargetCombinationId = useMemo(() => {
    if (!neighborChildren) return null;
    const targetChild = neighborChildren.right;
    const match = (results || [])
      ?.filter(
        (combination: any) =>
          combination.mood_board_url || combination.final_room_url,
      )
      .find(
        (combination: any) =>
          String(combinationToChild.get(combination.combination_id) || '').toLowerCase() ===
          targetChild,
      );
    return match?.combination_id ?? null;
  }, [neighborChildren, results, combinationToChild]);

  if (!isContainerVisible || !neighborChildren || (!leftSwatch && !rightSwatch)) return null;

  return (
    <div className="pointer-events-none z-[60] min-[760px]:block hidden">
      {leftSwatch && leftTargetCombinationId ? (
        <a
          className={cn(
            'pointer-events-auto fixed',
            'top-1/2 left-[10px] -translate-y-1/2',
            'hidden sm:flex',
            'items-center justify-center',
          )}
          href={`#combination-${leftTargetCombinationId}`}
          aria-label={`Go to ${String(leftSwatch.child || 'left')} swatch section`}
        >
          <div
            className={cn(
              'rounded-[16px] bg-[#ece4dd] p-[8px] shadow-[-6px_9px_17px_7px_rgba(0,0,0,0.4)]',
            )}
            title={String(leftSwatch.child || '')}
          >
            <Image
              src={leftSwatch.url}
              alt={String(leftSwatch.child || 'left-swatch')}
              width={80}
              height={80}
              className={cn('h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] object-contain')}
            />
          </div>
        </a>
      ) : null}

      {rightSwatch && rightTargetCombinationId ? (
        <a
          className={cn(
            'pointer-events-auto fixed',
            'top-1/2 right-[10px] -translate-y-1/2',
            'hidden sm:flex',
            'items-center justify-center',
          )}
          href={`#combination-${rightTargetCombinationId}`}
          aria-label={`Go to ${String(rightSwatch.child || 'right')} swatch section`}
        >
          <div
            className={cn(
              'rounded-[16px] bg-[#ece4dd] p-[8px] shadow-[-6px_9px_17px_7px_rgba(0,0,0,0.4)]',
            )}
            title={String(rightSwatch.child || '')}
          >
            <Image
              src={rightSwatch.url}
              alt={String(rightSwatch.child || 'right-swatch')}
              width={80}
              height={80}
              className={cn('h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] object-contain')}
            />
          </div>
        </a>
      ) : null}
    </div>
  );
}


