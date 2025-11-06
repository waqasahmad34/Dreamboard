import { useState } from 'react';
import { FaInstagram, FaRegCopy, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdOutlineContentCopy } from 'react-icons/md';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { cn } from '@/lib/utils';

type TComponentProps = {
  className?: string;
  url?: string; // Made optional - will use current page URL if not provided
  title?: string;
  description?: string;
  media?: string; // For Pinterest - image URL
};

const ListShareSocial2 = ({
  className,
  url,
  title = 'Check this out!',
  description = 'description',
  media,
}: TComponentProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Use provided URL or get current page URL
  const currentUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = async () => {
    // console.log('window.location.href', window.location.href);
    const currentPath = window.location.href;
    try {
      await navigator.clipboard.writeText(currentPath);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // const handleInstagramStoryShare = () => {
  //   const imageUrl = 'https://example.com/my-image.jpg';
  //   window.location.href = `instagram://story-camera?backgroundImage=${encodeURIComponent(imageUrl)}`;
  // };

  const classNameItem = 'h-[24px] w-[24px] transition-all duration-300';

  const social = [
    {
      name: 'Copy',
      component: (
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'cursor-pointer text-gray-600',
            'transition-all duration-300 hover:scale-110 hover:text-gray-900',
          )}
          aria-label={isCopied ? 'Copied!' : 'Copy link'}
          title={isCopied ? 'Copied!' : 'Copy link'}
        >
          <MdOutlineContentCopy
            className={cn(classNameItem, 'rounded-full')}
            style={{ color: isCopied ? '#10b981' : '#000000' }}
          />
        </button>
      ),
    },
    // {
    //   name: 'Instagram',
    //   component: (
    //     <>
    //       <a
    //         href={`https://www.instagram.com/?url=${encodeURIComponent(url)}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-gray-600 transition-all duration-300 hover:scale-110 hover:text-gray-900"
    //         aria-label="Instagram"
    //       >
    //         <FaInstagram className="h-6 w-6" style={{ color: '#e4405f' }} />
    //       </a>
    //       <button
    //         type="button"
    //         onClick={handleInstagramStoryShare}
    //         className={cn(
    //           'cursor-pointer text-gray-600',
    //           'transition-all duration-300 hover:scale-110 hover:text-gray-900',
    //           'md:hidden',
    //           'mx-[5px]',
    //         )}
    //       >
    //         <FaInstagram
    //           className={cn(classNameItem)}
    //           style={{ color: '#e4405f' }}
    //         />
    //       </button>
    //     </>
    //   ),
    // },
    {
      name: 'Pinterest',
      component: (
        <PinterestShareButton
          url={currentUrl}
          media={media || ''}
          description={description}
          className={cn(
            'cursor-pointer text-gray-600',
            'transition-all duration-300 hover:scale-110 hover:text-gray-900',
          )}
        >
          <PinterestIcon className={cn(classNameItem, 'rounded-full')} />
        </PinterestShareButton>
      ),
    },
    // {
    //   name: 'TikTok',
    //   component: (
    //     <a
    //       href={`https://www.tiktok.com/`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-gray-600 transition-all duration-300 hover:scale-110 hover:text-gray-900"
    //       aria-label="TikTok"
    //     >
    //       <FaTiktok className="h-6 w-6" style={{ color: '#000000' }} />
    //     </a>
    //   ),
    // },
    {
      name: 'Facebook',
      component: (
        <FacebookShareButton
          url={currentUrl}
          className={cn(
            'cursor-pointer text-gray-600',
            'transition-all duration-300 hover:scale-110 hover:text-gray-900',
          )}
        >
          <FacebookIcon className={cn(classNameItem, 'rounded-full')} />
        </FacebookShareButton>
      ),
    },
    {
      name: 'X',
      component: (
        <TwitterShareButton
          url={currentUrl}
          title={title}
          className={cn(
            'cursor-pointer text-gray-600',
            'transition-all duration-300 hover:scale-110 hover:text-gray-900',
          )}
        >
          <FaXTwitter className={cn(classNameItem)} />
        </TwitterShareButton>
      ),
    },
    {
      name: 'Reddit',
      component: (
        <>
          <a
            href={`https://reddit.com/submit?url=${currentUrl}&title=${title}`}
            onClick={(e) => {
              e.preventDefault();
              window.open(
                e.currentTarget.href,
                '',
                'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
              );
              return false;
            }}
            title="Share on Reddit"
            rel="noopener"
            className={cn(
              'cursor-pointer text-gray-600',
              'transition-all duration-300 hover:scale-110 hover:text-gray-900',
            )}
          >
            <RedditIcon className={cn(classNameItem, 'rounded-full')} />
          </a>
          {/* <RedditShareButton
            url={currentUrl}
            title={title}
            className="text-gray-600 transition-all duration-300 hover:scale-110 hover:text-gray-900"
          >
            <RedditIcon size={24} round />
          </RedditShareButton> */}
        </>
      ),
    },
  ];

  return (
    <div
      className={cn(
        'ListShareSocial2',
        'flex items-center justify-center',
        'flex-col lg:flex-row',
        'bg-white/50 backdrop-blur-[6px]',
        'p-[10px]',
        'rounded-[10px]',
        className,
      )}
    >
      {social.map((item) => (
        <div
          key={item.name}
          className={cn(
            'flex items-center justify-center',
            'my-[5px] lg:mx-[5px] lg:my-0',
          )}
        >
          {item.component}
        </div>
      ))}
    </div>
  );
};

export default ListShareSocial2;
