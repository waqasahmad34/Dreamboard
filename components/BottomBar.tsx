import Link from 'next/link';
import cn from '@/utils/cn';

function BottomBar() {
  const year = new Date().getFullYear();

  const classNameLi = 'w-full lg:w-auto flex justify-center text-center';
  return (
    <div className="BottomBar container flex items-center justify-center">
      <ul
        className={cn(
          'grow-1',
          'flex items-center lg:gap-[40px]',
          'justify-between',
          'flex-wrap lg:flex-nowrap',
          'font-bold text-[12px] text-gold uppercase',
          'gap-[20px] lg:gap-[40px]',
          'py-[40px]',
          'tracking-widest',
        )}
      >
        <li className={classNameLi}>Copyright © {year} DreamSofa.com®</li>
        <li className={classNameLi}>
          <Link href="https://www.dreamsofa.com/terms-and-conditions/">
            Terms of Use
          </Link>
        </li>
        <li className={classNameLi}>
          <Link href="https://www.dreamsofa.com/privacy-policy/">
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BottomBar;
