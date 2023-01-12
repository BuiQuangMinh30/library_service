import { m } from 'framer-motion';
import { useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
    AccountGeneral,
    AccountBilling,
    AccountSocialLinks,
    AccountNotifications,
    AccountChangePassword,
} from '../../sections/@dashboard/user/account';

import HomLists from './listhome/HomeLists'

import { MotionViewport, varFade } from '../../components/animate';
// ----------------------------------------------------------------------

export default function HomeList() {
    const { themeStretch } = useSettingsContext();

    const [currentTab, setCurrentTab] = useState('general');

    const TABS = [
        {
            value: 'general',
            label: 'Sách thiếu nhi',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <AccountGeneral />,
        },
        {
            value: 'billing',
            label: 'Sách trinh thám',
            icon: <Iconify icon="ic:round-receipt" />,
            component: (
                <AccountBilling
                    cards={_userPayment}
                    addressBook={_userAddressBook}
                    invoices={_userInvoices}
                />
            ),
        },
        {
            value: 'social_links',
            label: 'Truyện ngắn',
            icon: <Iconify icon="eva:share-fill" />,
            component: <AccountSocialLinks socialLinks={_userAbout.socialLinks} />,
        },

    ];

    return (
        <>
            <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ my: 2 }}>
                    SẢN PHẨM HOT
                </Typography>
                <Typography
                    sx={{
                        mx: 'auto',
                        maxWidth: 640,
                        color: 'text.secondary',
                    }}
                >
                    Sau đây là danh sách các sản phẩm được các độc giả thuê nhiều nhất trong năm 2021,
                    đa dạng ở nhiều loại sách và người đọc.
                </Typography>

                <Box sx={{
                    pt: 3,
                    pb: 5,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)} >
                        {TABS.map((tab) => (
                            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                        ))}
                    </Tabs>
                </Box>

                {/* {TABS.map(
                    (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
                )} */}
                <HomLists />
            </Container>

        </>
    );
}
