import React from 'react';
import Skeleton from 'react-loading-skeleton';

function AccountDetailsSkeleton(props) {
  return (
    <div className="account-detail">
      <div className="avatar">
        <Skeleton width={150} height={150} circle />
      </div>
      <div className="detail mt-1">
        {[1, 2, 3, 4].map((index) => (
          <React.Fragment key={index}>
            <div className="mt-1">
              <Skeleton width={'20%'} height={20} />
            </div>
            <div className="mt-1">
              <Skeleton width={'100%'} height={30} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default AccountDetailsSkeleton;
