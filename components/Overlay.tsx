import { cn } from '@/lib/utils';

interface IComponentProps {
  className?: string;
}

const Overlay = ({ className }: IComponentProps) => {
  return (
    <div
      className={cn('absolute', 'inset-0 z-[1]', 'bg-black/50', className)}
    />
  );
};

export default Overlay;
