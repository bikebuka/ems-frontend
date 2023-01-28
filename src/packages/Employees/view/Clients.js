import {
    Badge,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Divider,
    Grid, IconButton,
    Link, Menu, MenuItem, Table, TableBody,
    TableContainer, TableHead, TablePagination, Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { ArrowLeft } from '@mui/icons-material';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";

import {useDispatch, useSelector} from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Box} from "@mui/system";
import Page from "../../../shared/components/Page";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";

import {ToastContainer} from "react-toastify";
import {StyledTableCell, StyledTableRow} from "../../../shared/tables/TableStyle";
//
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import {getClients} from "../store/EmployeeAction";
import {formatDate} from "../../../shared/utils/helpers/helpers";
//
export default function Clients() {
    //table menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const navigate=useNavigate();
    const dispatch=useDispatch();
    //clients
    const {loading,clients,pagination}=useSelector(state=>state.ClientReducer)
    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //
    useEffect(()=> {
        let payload= {
            page: page+1,
            page_size: rowsPerPage
        }
        dispatch(getClients(payload))
    },[dispatch,page,rowsPerPage])
    //
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e,value) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };
    //
    return (
        <Page className="container" title="Accounts">
            <ToastContainer theme="colored"/>
            <Box sx={{m:5}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Clients</Typography>
                </Breadcrumbs>
                <Divider />
            </Box>
            <Box sx={{m:5}}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography>
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <Button color="error" onClick={()=>navigate(-1)} variant="outlined"><ArrowLeft />Go Back</Button>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography>
                            <TableContainer sx={{ minWidth: 800 }}>
                                {
                                    loading ?
                                        <Grid container sx={{justifyContent: 'center'}}> <SpinnerLoader/></Grid>
                                        :
                                        <Table>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>#S/N</StyledTableCell>
                                                    <StyledTableCell>Created On</StyledTableCell>
                                                    <StyledTableCell>Account Number</StyledTableCell>
                                                    <StyledTableCell>Account Name</StyledTableCell>
                                                    <StyledTableCell>Total Balance</StyledTableCell>
                                                    <StyledTableCell>Amount On Hold</StyledTableCell>
                                                    <StyledTableCell>Notification Number</StyledTableCell>
                                                    <StyledTableCell>Status</StyledTableCell>
                                                    <StyledTableCell>Actions</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>

                                                {clients ? clients.map((row,index) => {
                                                    const { id,status, date_created, account_number, account_name, available_balance, amount_on_hold, notification_number } = row;


                                                    return (
                                                        <StyledTableRow
                                                            hover
                                                            key={id}
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                        >

                                                            <StyledTableCell align="left">{index+1}</StyledTableCell>
                                                            <StyledTableCell align="left">{formatDate(date_created)}</StyledTableCell>
                                                            <StyledTableCell align="left">{account_number}</StyledTableCell>
                                                            <StyledTableCell align="left">{account_name}</StyledTableCell>
                                                            <StyledTableCell align="center">{available_balance}</StyledTableCell>
                                                            <StyledTableCell align="center">{amount_on_hold}</StyledTableCell>
                                                            <StyledTableCell align="left">{notification_number}</StyledTableCell>
                                                            <StyledTableCell align="left">{status===1 ? <Badge badgeContent="Active" color="success"></Badge> : status===0 ?<Badge badgeContent="Inactive" color="warning"></Badge>: <Badge badgeContent="Suspended" color="error"></Badge>}</StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                                    {(popupState) => (
                                                                        <>
                                                                            <IconButton
                                                                                aria-label="more"
                                                                                id="long-button"
                                                                                aria-controls={open ? 'long-menu' : undefined}
                                                                                aria-expanded={open ? 'true' : undefined}
                                                                                aria-haspopup="true"
                                                                                onClick={handleClick}
                                                                                {...bindTrigger(popupState)}
                                                                            >
                                                                                <MoreVertIcon />
                                                                            </IconButton>
                                                                            <Menu {...bindMenu(popupState)}>
                                                                                <MenuItem color="success"> <VisibilityIcon color="success" fontSize="small"/> View</MenuItem>
                                                                                <MenuItem color="error"> <DeleteIcon color="error" fontSize="small"/> Remove</MenuItem>
                                                                            </Menu>
                                                                        </>
                                                                    )}
                                                                </PopupState>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                }) : <> No items found</>}
                                            </TableBody>
                                        </Table>
                                }
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25,50]}
                                component="div"
                                count={pagination?.count}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                variant="outlined"
                                color="primary"
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Page>
    )
}
