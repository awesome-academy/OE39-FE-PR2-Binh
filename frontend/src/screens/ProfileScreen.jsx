import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Breadcrumb from '../components/Features/Breadcrumb';
import PageHeader from '../components/Features/PageHeader';
import AccountDetails from '../components/Partials/Profile/AccountDetails';
import OrderHistory from '../components/Partials/Profile/OrderHistory';
import UserAddress from '../components/Partials/Profile/UserAddress';
import UserDashboard from '../components/Partials/Profile/UserDashboard';
import UserSignout from '../components/Partials/Profile/UserSignout';

function ProfileScreen(props) {
  const { hash } = props.location;
  const [tabIndex, setTabIndex] = useState(0);

  const checkTabIndex = () => {
    switch (hash) {
      case '#tab-dashboard':
        setTabIndex(0);
        break;
      case '#tab-orders':
        setTabIndex(1);
        break;
      case '#tab-address':
        setTabIndex(2);
        break;
      case '#tab-account':
        setTabIndex(3);
        break;
      case '#tab-signout':
        setTabIndex(4);
        break;
      default:
        setTabIndex(0);
        break;
    }
  };

  useEffect(() => {
    checkTabIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const tabUserDashboards = [
    { title: 'Dashboard', value: 'dashboard', component: <UserDashboard /> },
    { title: 'Orders', value: 'orders', component: <OrderHistory /> },
    { title: 'Addresses', value: 'address', component: <UserAddress /> },
    { title: 'Account Details', value: 'account', component: <AccountDetails /> },
    { title: 'Sign Out', value: 'signout', component: <UserSignout /> },
  ];

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'User', href: '/user#tab-dashboard' },
  ];
  return (
    <div className="main">
      <PageHeader title={'User Profile'} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="container">
        <div className="profile">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(tabIndex) => setTabIndex(tabIndex)}
            selectedTabClassName="active show"
          >
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <TabList>
                  {tabUserDashboards.map((tab) => (
                    <Tab key={tab.value} className="nav-item">
                      <Link to={`#tab-${tab.value}`} className="nav-link">
                        {tab.title}
                      </Link>
                    </Tab>
                  ))}
                </TabList>
              </aside>
              <div className="col-md-8 col-lg-9">
                {tabUserDashboards.map((tab) => (
                  <TabPanel key={tab.value}>{tab.component}</TabPanel>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
