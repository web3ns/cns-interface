import React, { useState, useCallback, Suspense } from 'react';
import Button from '@components/Button';
import { useMinCommitLockTime, commitRegistration as _commitRegistration } from '@service/domain/register';
import useInTranscation from '@hooks/useInTranscation';
import { RegisterContainer } from '../index';

const Step1: React.FC<{ domain: string }> = ({ domain }) => {
  const [durationYears, setDuration] = useState<number>(1);
  const decreaseDuration = useCallback(() => setDuration((pre) => (pre - 1 >= 1 ? pre - 1 : 1)), []);
  const increaseDuration = useCallback(() => setDuration((pre) => pre + 1), []);

  const { inTranscation, execTranscation: commitRegistration } = useInTranscation(_commitRegistration);

  return (
    <RegisterContainer title="第一步：申请注册" className="flex flex-col text-14px text-grey-normal-hover text-opacity-50">
      <div className="mt-40px flex items-center justify-between text-14px">
        <div>
          <p>总计花费</p>

          <p className="mt-4px">
            <span className="leading-54px text-45px text-grey-normal font-bold">200.00</span>
            <span className="ml-4px">￥</span>
          </p>
        </div>

        <div>
          <p>注册时长</p>

          <div className="mt-4px flex items-center">
            <button
              onClick={decreaseDuration}
              className="mt-6px w-24px h-24px p-0 rounded-4px border-none text-grey-normal-hover text-opacity-50 bg-purple-dark-hover hover:bg-purple-dark cursor-pointer transition-colors"
            >
              <span className="i-fluent:subtract-12-filled text-16px font-bold" />
            </button>
            <p className="mx-24px">
              <span className="inline-block min-w-60px text-center leading-54px text-45px text-grey-normal font-bold">
                {durationYears < 10 ? `0${durationYears}` : durationYears}
              </span>
              <span className="ml-4px">年</span>
            </p>
            <button
              onClick={increaseDuration}
              className="mt-6px w-24px h-24px p-0 rounded-4px border-none text-grey-normal-hover text-opacity-50 bg-purple-dark-hover hover:bg-purple-dark cursor-pointer transition-colors"
            >
              <span className="i-fluent:add-12-filled text-15px font-bold" />
            </button>
          </div>
        </div>

        <Button
          className="mb-4px min-w-156px h-44px self-end"
          loading={inTranscation}
          onClick={() => commitRegistration({ domain, durationYears })}
        >
          申请
        </Button>
      </div>

      <p className="mt-auto px-24px py-16px rounded-12px leading-24px bg-#26233E whitespace-normal">
        在此步骤中，您可以请求注册并执行两个交易中的第一个。 根据顺序，系统将执行第一个申请，以确保没有其他用户同时注册此域名。 最多需要等待{' '}
        <Suspense fallback={'...'}>
          <MinCommitmentLockTime />
        </Suspense>
      </p>
    </RegisterContainer>
  );
};

const MinCommitmentLockTime: React.FC = () => {
  const minCommitLockTime = useMinCommitLockTime();
  return <>{`${minCommitLockTime} 秒。`}</>;
};

export default Step1;
