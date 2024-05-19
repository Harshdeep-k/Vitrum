import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';
import Logo from '/public/logo.svg';
import Help from '../assets/help.svg';
import Accessible from '../assets/accessible.svg';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faCircleQuestion } from "@fortawesome/fa-solid";

export const Navigation = () => {
//   const { signedAccountId, wallet } = useContext(NearContext);
//   const [action, setAction] = useState(() => { });
//   const [label, setLabel] = useState('Loading...');

//   useEffect(() => {
//     if (!wallet) return;

//     if (signedAccountId) {
//       setAction(() => wallet.signOut);
//       setLabel(`Logout ${signedAccountId}`);
//     } else {
//       setAction(() => wallet.signIn);
//       setLabel('Login');
//     }
//   }, [signedAccountId, wallet]);

  return (
    <div className='nav'>
      <Link href="/" passHref legacyBehavior>
        <Image src={Logo} alt="VITRUM" className="vitrum-logo" />
      </Link>
      <div>
        <Link href="/help" passHref legacyBehavior>
          <Image src={Help} alt="HELP" className="icons-nav" />
        </Link>
        <Link href="/help" passHref legacyBehavior>
          <Image src={Accessible} alt="HELP" className="icons-nav" />
        </Link>
      </div>
    </div>
  );
};