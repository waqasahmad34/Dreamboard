/** biome-ignore-all lint/a11y/useSemanticElements: TODO: fix this */
"use client";

import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaReddit,
  FaRegCopy,
  FaShareAlt,
  FaTiktok,
} from "react-icons/fa";
import { FaPinterest, FaXTwitter } from "react-icons/fa6";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { cn } from "@/lib/utils";

type TComponentProps = {
  className?: string;
  url?: string; // Made optional - will use current page URL if not provided
  title?: string;
  description?: string;
  media?: string; // For Pinterest - image URL
  withMobileClasses?: boolean;
};

const ListShareSocial = ({
  className,
  url,
  title = "Check this out!",
  description = "description",
  media,
  withMobileClasses = true,
}: TComponentProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || "");
  const [isShareListOpen, setIsShareListOpen] = useState(false);

  // Set URL after component mounts to avoid hydration mismatch
  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const handleCopy = async () => {
    // console.log('window.location.href', window.location.href);
    const currentPath = window.location.href;
    try {
      await navigator.clipboard.writeText(currentPath);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      setIsShareListOpen(false); // Close share list after copying
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleToggleShareList = () => {
    setIsShareListOpen(!isShareListOpen);
  };

  const handleSocialClick = () => {
    setIsShareListOpen(false);
  };

  // Close share list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isShareListOpen && !target.closest(".ListShareSocial")) {
        setIsShareListOpen(false);
      }
    };

    if (isShareListOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isShareListOpen]);

  // const handleInstagramStoryShare = () => {
  //   const imageUrl = 'https://example.com/my-image.jpg';
  //   window.location.href = `instagram://story-camera?backgroundImage=${encodeURIComponent(imageUrl)}`;
  // };

  // const videoUrl =
  //   'https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1/combination_1/generated_video.mp4';

  const classNameItem = [
    "transition-all duration-300",
    "h-[15px] w-[15px] sm:h-[25px] sm:w-[25px]",
  ];

  // console.log('currentUrl', currentUrl, media);

  const socialPlatforms = [
    {
      name: "Copy",
      component: (
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "cursor-pointer text-gray-600",
            "transition-all duration-300 hover:scale-110 hover:text-gray-900"
          )}
          aria-label={isCopied ? "Copied!" : "Copy link"}
          title={isCopied ? "Copied!" : "Copy link"}
        >
          <FaRegCopy
            className={cn(classNameItem)}
            style={{ color: isCopied ? "#10b981" : "#000000" }}
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
      name: "Pinterest",
      component: (
        <PinterestShareButton
          url={currentUrl}
          media={media || ""}
          description={description}
          onClick={handleSocialClick}
          className={cn(
            "cursor-pointer text-gray-600",
            "transition-all duration-300 hover:scale-110 hover:text-gray-900"
          )}
        >
          {/* <PinterestIcon className={cn(
						classNameItem,
						'rounded-full'
						)} /> */}
          <FaPinterest className={cn(classNameItem, "text-red-600")} />
        </PinterestShareButton>
      ),
    },
    // {
    //   name: 'TikTok',
    //   component: (
    //     <a
    //       href="https://www.tiktok.com/share/video?url=YOUR_CONTENT_URL"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       onClick={handleSocialClick}
    //       className={cn(
    //         'cursor-pointer text-gray-600',
    //         'transition-all duration-300 hover:scale-110 hover:text-gray-900',
    //       )}
    //       aria-label="TikTok"
    //       title="Share on TikTok"
    //     >
    //       <FaTiktok
    //         className={cn(classNameItem)}
    //         style={{ color: '#000000' }}
    //       />
    //     </a>
    //   ),
    // },
    {
      name: "Facebook",
      component: (
        <FacebookShareButton
          url={currentUrl}
          onClick={handleSocialClick}
          className={cn(
            "cursor-pointer text-gray-600",
            "transition-all duration-300 hover:scale-110 hover:text-gray-900"
          )}
        >
          {/* <FacebookIcon className={cn(classNameItem, 'rounded-full')} /> */}
          <FaFacebook className={cn(classNameItem, "text-blue-600")} />
        </FacebookShareButton>
      ),
    },
    {
      name: "X",
      component: (
        <TwitterShareButton
          url={currentUrl}
          title={title}
          onClick={handleSocialClick}
          className={cn(
            "cursor-pointer text-gray-600",
            "transition-all duration-300 hover:scale-110 hover:text-gray-900"
          )}
        >
          <FaXTwitter className={cn(classNameItem)} />
        </TwitterShareButton>
      ),
    },
    {
      name: "Reddit",
      component: (
        <>
          <a
            href={`https://reddit.com/submit?url=${currentUrl}&title=${title}`}
            onClick={(e) => {
              e.preventDefault();
              window.open(
                e.currentTarget.href,
                "",
                "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
              );
              handleSocialClick();
              return false;
            }}
            title="Share on Reddit"
            rel="noopener"
            className={cn(
              "cursor-pointer text-gray-600",
              "transition-all duration-300 hover:scale-110 hover:text-gray-900"
            )}
          >
            {/* <RedditIcon className={cn(classNameItem, 'rounded-full')} /> */}
            <FaReddit className={cn(classNameItem, "text-[#ff4500]")} />
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
        "ListShareSocial",
        "flex items-center justify-center",
        "transition-all duration-300 hover:scale-110 hover:bg-white/50",
        "relative",
        "p-[10px]",
        "bg-white",
        "rounded-[16px]",
        "cursor-pointer",
        "group",
        className
      )}
      onClick={handleToggleShareList}
      role="button"
      tabIndex={0}
      aria-label="Share options"
      aria-expanded={isShareListOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggleShareList();
        }
      }}
    >
      <FaShareAlt
        className={cn("pointer-events-none", "size-[10px] lg:size-[16px]")}
      />

      <div
        className={cn(
          "SocialShareList",
          "flex items-center justify-center",
          "absolute",
          "lg:top-[-53px]",

          "lg:left-auto",
          withMobileClasses ? "left-[30px]" : "left-auto",
          withMobileClasses ? "top-[-0px]" : "top-[-30px]",

          "rounded-[16px]",
          "bg-white",
          "p-[8px] lg:p-[15px]",
          "hidden group-hover:flex",
          isShareListOpen && "flex",
          "gap-[10px]"
        )}
      >
        {socialPlatforms.map((item) => (
          <div
            key={item.name}
            className={cn("rounded-[16px]", "flex items-center justify-center")}
          >
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListShareSocial;
