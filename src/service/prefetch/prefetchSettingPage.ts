import { useCallback } from 'react';
import { throttle } from 'lodash-es';
import { usePrefetchDomainOwner, usePrefetchDomainExpire } from '@service/domainInfo';
import { getDomainRegistrar as prefetchDomainRegistrar } from '@service/domainRegistrar';

export const usePrefetchSettingPage = (domain: string) => {
  const prefetchDomainOwner = usePrefetchDomainOwner();
  const prefetchDomainExpire = usePrefetchDomainExpire();
  return useCallback(
    throttle(() => {
      prefetchDomainOwner(domain);
      prefetchDomainRegistrar(domain);
      prefetchDomainExpire(domain);
    }, 10000),
    [domain]
  );
};