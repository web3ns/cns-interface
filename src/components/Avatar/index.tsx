import React, { useRef, useLayoutEffect, type HTMLAttributes } from 'react';
import jazzIcon from '@utils/jazzIcon';
import { addressToNumber, convertCfxToHex } from '@utils/addressUtils';
import removeAllChild from '@utils/removeAllChild';

const Avatar: React.FC<HTMLAttributes<HTMLDivElement> & { address: string | null | undefined; diameter: number }> = ({ address, diameter }) => {
  const renderAddress = addressToNumber(convertCfxToHex(address!));
  const avatarContainerRef = useRef<HTMLDivElement>(null!);
  useLayoutEffect(() => {
    const avatarDom = jazzIcon(diameter, renderAddress);
    removeAllChild(avatarContainerRef.current);
    avatarContainerRef.current.appendChild(avatarDom);
  }, [diameter, renderAddress]);
  return <div className={`h-${diameter}px w-${diameter}px`} ref={avatarContainerRef} />;
};

export default Avatar;
