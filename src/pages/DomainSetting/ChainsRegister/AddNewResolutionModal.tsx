import React, { useState, useCallback, useMemo } from 'react';
import cx from 'clsx';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import { showModal, showDrawer, hideAllModal } from '@components/showPopup';
import Input from '@components/Input';
import usePressEsc from '@hooks/usePressEsc';
import useInTranscation from '@hooks/useInTranscation';
import isMobile from '@utils/isMobie';
import { useRefreshRegistrar, setRegistrarAddress as _setRegistrarAddress, type Chain, type useDomainRegistrar } from '@service/domainRegistrar';

const ModalContent: React.FC<{ domain: string; registrableChains: ReturnType<typeof useDomainRegistrar> }> = ({ domain, registrableChains }) => {
  const { register, handleSubmit: withForm,  } = useForm();

  const [visible, setVisible] = useState(false);
  const hideDropdown = useCallback(() => setVisible(false), []);
  const triggerDropdown = useCallback(() => setVisible((pre) => !pre), []);
  usePressEsc(hideDropdown);

  const [selectedChain, setSelectedChain] = React.useState(() => registrableChains[0].chain);
  const selectableChains = useMemo(() => registrableChains.map(({ chain }) => chain).filter((chain) => chain !== selectedChain), [selectedChain, registrableChains]);
  const selectChain = useCallback((chain: Chain) => {
    setVisible(false);
    setTimeout(() => setSelectedChain(chain), 32);
  }, []);

  const { inTranscation, execTranscation: setRegistrarAddress } = useInTranscation(_setRegistrarAddress);
  const handleRefreshRegistrar = useRefreshRegistrar(domain);
  const handleSetRegistrarAddress= useCallback(withForm(({ address }) => setRegistrarAddress({ domain, chain: selectedChain, address, handleRefreshRegistrar })), [selectedChain]);

  return (
    <form onSubmit={handleSetRegistrarAddress}>
      <div className="pt-24px grid grid-rows-[18px_50px] grid-cols-[38.4%_61.6%] gap-y-16px">
        <span className="text-14px text-grey-normal-hover text-opacity-50">选择公链</span>
        <span className="text-14px text-grey-normal-hover text-opacity-50">填写地址</span>

        <Dropdown
          className="w-200px border-2px border-purple-normal rounded-8px bg-purple-dark-active overflow-hidden dropdown-shadow"
          visible={visible}
          onClickOutside={hideDropdown}
          Content={<ChainSelect selectableChains={selectableChains} selectChain={selectChain} />}
        >
          <div
            className="flex items-center pl-8px pr-12px h-full rounded-l-10px border-2px border-purple-normal text-14px text-grey-normal cursor-pointer"
            onClick={triggerDropdown}
          >
            {selectedChain}
            <span className={cx('ml-auto i-ant-design:caret-down-outlined text-16px transition-transform', visible && 'rotate-180')} />
          </div>
        </Dropdown>

        <div className="flex items-center h-full rounded-r-10px border-2px !border-l-none border-purple-normal text-14px text-grey-normal">
          <Input id="register-address" size="small" placeholder="请输入地址" autoFocus {...register('address', { required: true })} />
        </div>
      </div>

      <div className="mt-140px flex justify-center items-center gap-16px">
        <Button variant='outlined' className='min-w-152px' onClick={hideAllModal} type="button">取消</Button>
        <Button className='min-w-152px' loading={inTranscation}>确定</Button>
      </div>
    </form>
  );
};

const ChainSelect: React.FC<{ selectableChains: Array<string>; selectChain: Function }> = ({ selectableChains, selectChain }) => {
  return (
    <>
      {selectableChains.map((chain) => (
        <div key={chain} className="pl-8px h-48px leading-48px hover:bg-[#26233E] text-14px text-grey-normal cursor-pointer transition-colors" onClick={() => selectChain(chain)}>
          {chain}
        </div>
      ))}
    </>
  );
};

const showAddNewResolutionModal = (domain: string, domainRegistrars: ReturnType<typeof useDomainRegistrar>) => {
  const registrableChains = domainRegistrars.filter(({ address }) => !address);

  if (isMobile()) {
    showDrawer({ Content: <ModalContent domain={domain} registrableChains={registrableChains} />, title: '新增解析地址' });
  } else {
    showModal({ Content: <ModalContent domain={domain} registrableChains={registrableChains} />, title: '新增解析地址' });
  }
};

export default showAddNewResolutionModal;