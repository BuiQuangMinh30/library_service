// @mui
import { Box, Card, Button, Typography, Stack, Divider } from '@mui/material';
// @types
import { IUserAccountBillingAddress } from '../../../@types/user';
// components
import { useAuthContext } from '../../../auth/useAuthContext';
import Iconify from '../../../components/iconify';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

type Props = {
  addressBook: IUserAccountBillingAddress[];
};

export default function AccountBillingAddressBook({ addressBook }: Props) {
  const token = localStorage.getItem('access_Token');
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<any>([]);
  useEffect(() => {
    const data = async () => {
      const resApi = await axios.get("http://localhost:8080/api/orders/user-account", {
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        }
      })
      setOrders(resApi.data)
    }
    data();
  }, [])
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Billing Info
        </Typography>

        {/* <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Billing Address
        </Button> */}
      </Stack>

      <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        {orders.map((order: any) => (
          <Stack key={order.orderId} spacing={1}>
            <Typography variant="subtitle1">Mã Order: {order.orderId}</Typography>
            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Họ tên người thuê:
              </Box>
              {`${order.fullName}`}
            </Typography>
            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Địa chỉ:
              </Box>
              {`${order.address}`}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Số điện thoại:
              </Box>
              {order.phoneNumber}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Tổng tiền thuê:
              </Box>
              {order.totalRent}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Tổng tiền cọc:
              </Box>
              {order.totalDeposit}
            </Typography>

            <Stack direction="row" spacing={1}>

              <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />}>
                Xem chi tiết đơn đặt hàng.
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
