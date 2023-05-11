import Link from 'next/link';
import Image from 'next/image';

const NavBrand = () => {
  return (
    <Link href="/" className="lg:px-2">
      <Image
        priority
        src="/assets/images/logo.png"
        alt="Absence Management"
        width={50}
        height={50}
      />
    </Link>
  );
};

export default NavBrand;
