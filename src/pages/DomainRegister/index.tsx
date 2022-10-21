import React from 'react';
import PageWrapper from '@components/Layout/PageWrapper';
import { useParams } from 'react-router-dom';
import Status from '@modules/Status';
import Register from './Register';

const DomainRegister: React.FC = () => {
  const { domain: _domain } = useParams();
  const domain = _domain?.toLocaleLowerCase().trim() ?? '';

  return (
    <PageWrapper className="pt-72px">
      <Status className="mb-24px" domain={domain} where="register" />
      <Register />
    </PageWrapper>
  );
};

export default DomainRegister;
