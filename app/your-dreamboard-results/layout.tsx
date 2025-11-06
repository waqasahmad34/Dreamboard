import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Dream Board Results',
  description: 'View your personalized dream board results and room combinations',
  robots: 'noindex, nofollow',
};

export default function DreamBoardResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
