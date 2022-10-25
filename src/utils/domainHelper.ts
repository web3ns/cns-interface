import { keccak256 } from '@ethersproject/keccak256';
import { Buffer } from 'buffer';
import { toHex } from '@utils/addressUtils';
import { LRUCacheFunction } from '@utils/LRUCache';

const _getDomainHash = (domain: string) => {
  const hashBuf = keccak256(Buffer.from(domain));
  return toHex(hashBuf);
}
export const getDomainHash = LRUCacheFunction(_getDomainHash, 'getDomainHash');

export const randomSecret = () => {
    const bytes = Buffer.allocUnsafe(32);
    return `0x${crypto.getRandomValues(bytes).toString('hex')}`;
  };
  