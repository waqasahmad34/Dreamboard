import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

const ListSocial = () => {
  const social = [
    {
      icon: FaFacebook,
      link: 'https://www.facebook.com',
      name: 'Facebook',
    },
    {
      icon: FaYoutube,
      link: 'https://www.youtube.com',
      name: 'YouTube',
    },
    {
      icon: FaPinterest,
      link: 'https://www.pinterest.com',
      name: 'Pinterest',
    },
    {
      icon: FaInstagram,
      link: 'https://www.instagram.com',
      name: 'Instagram',
    },
    {
      icon: FaTiktok,
      link: 'https://www.tiktok.com',
      name: 'TikTok',
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {social.map((item) => (
        <a
          key={item.name}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 transition-all duration-300 hover:scale-110 hover:text-gray-900"
          aria-label={item.name}
        >
          <item.icon className="h-5 w-5 text-gold" />
        </a>
      ))}
    </div>
  );
};

export default ListSocial;
