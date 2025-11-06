import cn from '@/utils/cn';

interface SliderProgressBarProps {
  items: { id: number | string }[];
  visibleSlides: number[];
  onNavigateToSlide: (index: number) => void;
  className?: string;
}

const SliderProgressBar = ({
  items,
  visibleSlides,
  onNavigateToSlide,
  className,
}: SliderProgressBarProps) => {
  return (
		<div className={cn('SliderProgressBar', 'w-full', className)}>
			<div
				className={cn(
					'flex items-center justify-start',
					'gap-[0px]',
					'pointer-events-none',
					'rounded-[16px]',
					'overflow-hidden',
				)}
			>
				{items.map((item, index) => (
					<button
						type="button"
						key={item.id}
						className={cn(
							'aspect-square',
							'cursor-pointer',
							'h-[4px]',
							'w-[30px]',
							visibleSlides.includes(index)
								? 'bg-gray-600 shadow-blue-600/30 shadow-lg'
								: 'bg-gray-300 hover:bg-gray-400',
						)}
						onClick={() => onNavigateToSlide(index)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								onNavigateToSlide(index);
							}
						}}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
  );
};

export default SliderProgressBar;
