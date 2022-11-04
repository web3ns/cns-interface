export * from './price';
export * from './web3';
export * from './web2/pc';
import { atomFamily, useRecoilValue } from 'recoil';
import { setRecoil, getRecoil } from 'recoil-nexus';
import { persistAtomWithDefault } from '@utils/recoilUtils';

const waitPayConfrimState = atomFamily<boolean, string>({
  key: 'waitPayConfrim',
  effects: [persistAtomWithDefault(false)]
});

export const setWaitPayConfrim = (domain: string, state: boolean) => setRecoil(waitPayConfrimState(domain), state);
export const getWaitPayConfrim = (domain: string) => getRecoil(waitPayConfrimState(domain));

export const useWaitPayConfrimState = (domain: string) => useRecoilValue(waitPayConfrimState(domain));
