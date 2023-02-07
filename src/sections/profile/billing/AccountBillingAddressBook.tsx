// @mui
import {
  Box, Card, Typography, Stack, Divider, Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
// @types
import { IUserAccountBillingAddress } from '../../../@types/user';
// components
import { useAuthContext } from '../../../auth/useAuthContext';
import FormProvider from '../../../components/hook-form';
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
  const [show, setShow] = useState<boolean>(false)
  const [orders, setOrders] = useState<any>([]);
  const [orderItem, setOrderItem] = useState<any>([]);
  console.log(orders)
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
  const showItem = async (id: any) => {
    setShow(true);
    const resAPI = await axios.get(`http://localhost:8080/api/order/${id}`, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    console.log(resAPI)
    setOrderItem(resAPI.data)
  }

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Billing Info
        </Typography>
      </Stack>

      <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        {orders.map((order: any) => (

          <Stack key={order.orderId} spacing={1} sx={{
            backgroundColor:
              `${order.status}` == 'PENDING' ? '#fff2cc' :
                `${order.status}` == 'AVAILABLE' ? '#8fce00' : '#f6b26b'
            , padding: 1,
            borderRadius: 2
          }}>

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

              <Button type='submit' size="small" startIcon={<Iconify icon="eva:edit-fill" />}
                onClick={e => showItem(order.orderId as any)}>
                Xem chi tiết đơn đặt hàng.
              </Button>
            </Stack>

          </Stack>


        ))}
      </Stack>

      {/* <Dialog fullWidth maxWidth="md" open={show}>
        <DialogTitle>Add new address</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
           
          </Stack>
        </DialogContent>


      </Dialog> */}
    </Card>
  );
}
