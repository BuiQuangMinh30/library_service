import { Helmet } from 'react-helmet-async';

import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// import { getProducts } from '../../redux/slices/product';
import { getProducts } from '../../redux/slices/book';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useParams } from 'react-router-dom';
// @types
// import { IProduct, IProductFilter } from '../../@types/product';
import { IBook, IProductFilter } from '../../@types/books';
// components
import FormProvider from '../../components/hook-form';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import { BooksBread, BookSearch, BookCards, BookFilter, BookLists, BookSort, BookTagFiltered } from './books';
import CartWidget from '../@dashboard/e-commerce/CartWidget';
import axios from 'axios';



// ----------------------------------------------------------------------
const axiosInstance = process.env.REACT_APP_HOST_API_KEY;
export default function BookPostsPage() {
    const { themeStretch } = useSettingsContext();
    const { id } = useParams()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        const getAPIData = async () => {
            setLoading(true)
            try {
                const apiResponse = await axios.get(`http://localhost:8080/api/books/category/${id ? id : 1}`)
                setBooks(apiResponse.data)
            } catch (error) {
                console.log('error', error)
            }
        };
        getAPIData()
        setLoading(false)
    }, [id])


    const [openFilter, setOpenFilter] = useState(false);

    const defaultValues = {
        sortBy: 'featured',
    };

    const methods = useForm<IProductFilter>({
        defaultValues,
    });

    const {
        reset,
        watch,
        formState: { dirtyFields },
    } = methods;

    const isDefault =
        (!dirtyFields.gender &&
            !dirtyFields.category &&
            !dirtyFields.colors &&
            !dirtyFields.priceRange &&
            !dirtyFields.rating) ||
        false;

    const values = watch();

    const dataFiltered = applyFilter(books, values);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleResetFilter = () => {
        reset();
    };

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <>

            <FormProvider methods={methods}>
                <Container maxWidth={themeStretch ? false : 'lg'}>
                    <BooksBread />

                    <Stack
                        spacing={2}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ sm: 'center' }}
                        justifyContent="space-between"
                        sx={{ mb: 2 }}
                    >
                        <BookSearch />

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>


                            <BookSort />
                        </Stack>
                    </Stack>

                    <Stack sx={{ mb: 3 }}>
                        {!isDefault && (
                            <>
                                <Typography variant="body2" gutterBottom>
                                    <strong>{dataFiltered.length}</strong>
                                    &nbsp;Products found
                                </Typography>

                                <BookTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
                            </>
                        )}
                    </Stack>

                    <BookLists products={dataFiltered} loading={!books.length && isDefault} />

                </Container>
            </FormProvider>
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter(products: IBook[], filters: IProductFilter) {
    const { gender, category, colors, priceRange, rating, sortBy } = filters;


    // SORT BY
    if (sortBy === 'priceDesc') {
        products = orderBy(products, ['price'], ['desc']);
    }

    if (sortBy === 'priceAsc') {
        products = orderBy(products, ['price'], ['asc']);
    }

    if (sortBy === 'price_borrowDesc') {
        products = orderBy(products, ['borrow_price'], ['asc']);
    }

    if (sortBy === 'price_borrowAsc') {
        products = orderBy(products, ['borrow_price'], ['desc']);
    }

    return products;
}
