import Image from 'next/image';
import Link from 'next/link';
import ListSocial from '@/components/Lists/ListSocial';

import logo_footer from '@/public/images/logo-footer.png';

const Footer = () => {
  return (
    <div className="Footer bg-gold-light py-[50px] text-gold">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-4">
          <div className="flex flex-col items-center gap-[30px]">
            <Image src={logo_footer} alt="DreamSofa" width={265} height={174} />
            {/* <ListSocial /> */}
          </div>
          <div className="flex flex-col gap-[15px]">
            <h3 className="border-gold border-b pb-[5px] font-bold text-[18px] uppercase">
              About Us
            </h3>
            <ul className="flex flex-col gap-[10px] text-[16px] uppercase [&>li>a:hover]:underline">
              <li>
                <Link href="https://www.dreamsofa.com/our-story/">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/personalization/">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/pricing/">Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[15px]">
            <h3 className="border-gold border-b pb-[5px] font-bold text-[18px] uppercase">
              Resources
            </h3>
            <ul className="flex flex-col gap-[10px] text-[16px] uppercase [&>li>a:hover]:underline">
              <li>
                <Link href="https://www.dreamsofa.com/quality/">Quality</Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/warranty/">Warranty</Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/fabrics/">Fabrics</Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/personalization/">
                  Personalization
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/book-an-appointment/">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/product-category/sofa-sleeper/">
                  Sleeper Sofas
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/product-category/sectional/">
                  Custom Sofas
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[15px]">
            <h3 className="border-gold border-b pb-[5px] font-bold text-[18px] uppercase">
              Help
            </h3>
            <ul className="flex flex-col gap-[10px] text-[16px] uppercase [&>li>a:hover]:underline">
              <li>
                <Link href="https://www.dreamsofa.com/my-account/">
                  Account / Login
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/contact/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/delivery/">Delivery</Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/shipping/">Shipping</Link>
              </li>
              <li>
                <Link href="https://www.dreamsofa.com/returns/">Returns</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
