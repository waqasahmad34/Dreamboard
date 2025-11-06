import { cn } from '@/lib/utils';

interface IComponentProps {
  className?: string;
}

const BoxShadow = ({ className }: IComponentProps) => {
  return (
    <div
      className={cn('BoxShadow', 'absolute inset-0 z-[10]', className)}
      style={{
        boxShadow: 'inset 0px 0px 15px 13px #FFFFFF',
      }}
    />
  );
};

export default BoxShadow;
