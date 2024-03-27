import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import ScreenSearchDesktopTwoToneIcon from '@mui/icons-material/ScreenSearchDesktopTwoTone';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { api_AuthURL, ApiBaseURL, api_UserName, api_Password } from "../../Constant/Constant";
import axios from "axios";
import { SaveCustomerOrderDetails, SaveCustomerDetails } from "../../Services/svcCustomerOrderService";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import { AES, enc } from "crypto-js";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const TitleList = [
    {
        value: '1',
        label: 'Mr',
    },
    {
        value: '2',
        label: 'Mrs',
    },
    {
        value: '3',
        label: 'Ms',
    },
];

function CustomerOrder() {
    const [OrderId, setOrderId] = useState("");
    const [OrderNumber, setOrderNumber] = useState("");
    const [date, setDate] = useState(new Date());
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [CustomerCode, setCustomerCode] = useState("");
    const [Title, setTitle] = useState("");
    const [CustomerName, setCustomerName] = useState("");
    const [CustomerAddress, setCustomerAddress] = useState("");
    const [isExistingCustomer, setisExistingCustomer] = useState(false);
    const [CustomerOrder, setCustomerOrder] = useState([]);
    const [RLens, setRLens] = useState("");
    const [RLensList, setRLensList] = useState([]);
    const [LLens, setLLens] = useState("");
    const [LLensList, setLLensList] = useState([]);
    const [DRSPH, setDRSPH] = useState();
    const [DRCYL, setDRCYL] = useState();
    const [DRAXIS, setDRAXIS] = useState();
    const [DRADD, setDRADD] = useState();
    const [DLSPH, setDLSPH] = useState();
    const [DLCYL, setDLCYL] = useState();
    const [DLAXIS, setDLAXIS] = useState();
    const [DLADD, setDLADD] = useState();
    const [NRSPH, setNRSPH] = useState(parseFloat(DRSPH + DRADD));
    const [NRCYL, setNRCYL] = useState("");
    const [NRAXIS, setNRAXIS] = useState("");
    const [NRADD, setNRADD] = useState("");
    const [NLSPH, setNLSPH] = useState("");
    const [NLCYL, setNLCYL] = useState("");
    const [NLAXIS, setNLAXIS] = useState("");
    const [NLADD, setNLADD] = useState("");
    const [RDCheck, setRDCheck] = useState(false);
    const [RNCheck, setRNCheck] = useState(false);
    const [LDCheck, setLDCheck] = useState(false);
    const [LNCheck, setLNCheck] = useState(false);
    const [FrameList, setFrameList] = useState([]);
    const [FrameId, setFrameId] = useState("");
    const [IPD, setIPD] = useState();
    const [isGrinding, setisGrinding] = useState();
    const [isCustomerFrame, setisCustomerFrame] = useState(false);
    const [FrameBarCode, setFrameBarCode] = useState();
    const [FrameDetails, setFrameDetails] = useState("");

    const [RightLensPrice, setRightLensPrice] = useState();
    const [LeftLensPrice, setLeftLensPrice] = useState();
    const [FramePrice, setFramePrice] = useState();
    const [SumAmount, setSumAmount] = useState();
    const [Discount, setDiscount] = useState();
    const [DiscountDDL, setDiscountDDL] = useState([]);
    const [AdvanceAmount, setAdvanceAmount] = useState(0);
    const [FinalAmount, setFinalAmount] = useState();
    const [DueAmount, setDueAmount] = useState("");

    var EmployeeName = AES.decrypt(
        sessionStorage.getItem("EmployeeName"), "EPKEY"
    ).toString(enc.Utf8)

    var EmployeeGID = AES.decrypt(
        sessionStorage.getItem("EmployeeGID"), "EPKEY"
    ).toString(enc.Utf8)

    var StoreCode = AES.decrypt(
        sessionStorage.getItem("StoreCode"), "EPKEY"
    ).toString(enc.Utf8)

    const handleRLensADDChange = async (value) => {
        debugger;
        if (value != '') {
            setNRSPH((parseFloat(DRSPH) + parseFloat(value)).toFixed(2));
        }
    }

    const handleSubmitClick = async (event) => {
        event.preventDefault();

        let CustomerOrderDetails = {
            OrderId: OrderId,
            StoreCode: StoreCode,
            PhoneNumber: PhoneNumber,
            CustomerCode: CustomerCode,
            Title: Title,
            CustomerName: CustomerName,
            CustomerAddress: CustomerAddress,
            isExistingCustomer: isExistingCustomer,
            RDCheck: RDCheck,
            RNCheck: RNCheck,
            LDCheck: LDCheck,
            LNCheck: LNCheck,
            RLens: RLens,
            LLens: LLens,
            DRSPH: DRSPH,
            DRCYL: DRCYL,
            DRAXIS: DRAXIS,
            DRADD: DRADD,
            DLSPH: DLSPH,
            DLCYL: DLCYL,
            DLAXIS: DLAXIS,
            DLADD: DLADD,
            NRSPH: NRSPH,
            NRCYL: NRCYL,
            NRAXIS: NRAXIS,
            NLSPH: NLSPH,
            NLCYL: NLCYL,
            NLAXIS: NLAXIS,
            IPD: IPD,
            IsGrinding: isGrinding,
            IsCustomerFrame: isCustomerFrame,
            FrameBarCode: FrameBarCode,
            FrameDetails: FrameDetails,
            RightLensPrice: RightLensPrice,
            LeftLensPrice: LeftLensPrice,
            FramePrice: FramePrice,
            Discount: Discount,
            AdvanceAmount: AdvanceAmount,
            FinalAmount: FinalAmount,
            DueAmount: DueAmount,
            CreatedBy: EmployeeGID

        }

        const url = ApiBaseURL + api_AuthURL;
        const param_data = { username: api_UserName, password: api_Password }

        try {
            const response = await axios.post(url, param_data);
            SaveCustomerOrderDetails(response.data, CustomerOrderDetails).then(
                async (res) => {
                    if (res > 0) {

                    } else {

                    }
                }
            )
        } catch (error) {

        }
    }

    const handleAddNewCustomer = async (event) => {
        event.preventDefault();
        if (PhoneNumber != null) {
            let CustomerDetails = {
                StoreCode: StoreCode,
                PhoneNumber: PhoneNumber,
                Title: Title,
                CustomerName: CustomerName,
                CustomerAddress: CustomerAddress,
                CreatedBy: EmployeeGID
            }

            const url = ApiBaseURL + api_AuthURL;
            const param_data = { username: api_UserName, password: api_Password }

            try {
                const response = await axios.post(url, param_data);
                SaveCustomerDetails(response.data, CustomerDetails).then(
                    async (res) => {
                        if (res > 0) {

                        } else {

                        }
                    }
                )
            } catch (error) {

            }
        }
    }

    useEffect(() => {
    }, [])

    return (
        <React.Fragment>
            <Container maxWidth sx={{ minHeight: "90%" }}>
                <Box sx={{ width: '100%', flexGrow: 1 }} >
                    <Grid sx={{ width: "100%" }}>
                        <Stack direction="row" spacing={2}>
                            <Item sx={{ width: "40%", backgroundColor: "#e6f7ff", fontSize: "small" }}><b>{StoreCode}</b></Item>
                            <Item sx={{ width: "20%", backgroundColor: "#e6f7ff", fontSize: "small" }}><b>Date: {date.toLocaleDateString()}</b></Item>
                            <Item sx={{ width: "20%", backgroundColor: "#e6f7ff", fontSize: "small" }}><b>{EmployeeName}</b></Item>
                            <Item sx={{ width: "20%", backgroundColor: "#e6f7ff", fontSize: "small" }}><b>{"ODR/25022024/1"}</b></Item>
                        </Stack>
                    </Grid>
                    <Grid sx={{ width: "100%" }} mt={1} style={{ display: "flex" }}>
                        <Card sx={{ width: "60%" }}>
                            <CardHeader
                                title={
                                    <AppBar position="static" style={{ textAlign: "left", borderRadius: "5px", backgroundColor: "#1d0a5b" }}>
                                        <Toolbar style={{ minHeight: "10px" }}>
                                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} minHeight="10px" align="center">
                                                <span>Customer</span>
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                }>
                            </CardHeader>
                            <CardContent>
                                <Grid container rowSpacing={1.5} columnSpacing={{ sx: 1, sm: 2, md: 2 }} >
                                    <React.Fragment>
                                        <Grid item xs={7} sx={{ display: "flex" }}>
                                            <TextField
                                                required
                                                name="PhoneNumber"
                                                label="Phone Number"
                                                value={PhoneNumber}
                                                onChange={(event) => setPhoneNumber(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                            <IconButton color="secondary" aria-label="Search History">
                                                <ScreenSearchDesktopTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                required
                                                name="CustomerCode"
                                                label="Customer Code"
                                                value={CustomerCode}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                label="Title"
                                                fullWidth
                                                size="small"
                                                value={Title}
                                            // helperText="Please select your currency"
                                            >
                                                {TitleList.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                required
                                                name="CustomerName"
                                                label="Customer Name"
                                                value={CustomerName}
                                                onChange={(event) => setCustomerName(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField
                                                required
                                                name="CustomerAddress"
                                                label="Customer Address"
                                                value={CustomerAddress}
                                                onChange={(event) => setCustomerAddress(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                rows={3}
                                            />
                                        </Grid>
                                        <Grid item xs={2} mt={5}>
                                            <IconButton aria-label="Add New Customer" onClick={handleAddNewCustomer}>
                                                <PersonAddIcon color="primary" />
                                            </IconButton>
                                        </Grid>
                                    </React.Fragment>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ width: "40%" }}>
                            <CardHeader title={
                                <AppBar position="static" style={{ textAlign: "left", borderRadius: "5px", backgroundColor: "#1d0a5b" }}>
                                    <Toolbar style={{ minHeight: "10px" }}>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} minHeight="10px" align="center">
                                            <span>Customer History</span>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            }>
                            </CardHeader>
                            <CardContent>
                                <TableContainer component={Paper} style={{ maxHeight: '200px' }}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Customer Name</TableCell>
                                                <TableCell align="left">Customer Code</TableCell>
                                                <TableCell align="left">Order Number</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow> */}
                                            <TableRow>
                                                <TableCell component="th" scope="row">Tonmoy
                                                </TableCell>
                                                <TableCell align="left">1234567890</TableCell>
                                                <TableCell align="left">ODR/16102023/1</TableCell>

                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Manna
                                                </TableCell>
                                                <TableCell align="left">0987654321</TableCell>
                                                <TableCell align="left">ODR/16102023/2</TableCell>

                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Manna
                                                </TableCell>
                                                <TableCell align="left">0987654321</TableCell>
                                                <TableCell align="left">ODR02</TableCell>

                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Manna
                                                </TableCell>
                                                <TableCell align="left">0987654321</TableCell>
                                                <TableCell align="left">ODR02</TableCell>

                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Manna
                                                </TableCell>
                                                <TableCell align="left">0987654321</TableCell>
                                                <TableCell align="left">ODR02</TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid sx={{ width: "100%" }} mt={1} style={{ display: "flex" }}>
                        <Card sx={{ width: "100%" }}>
                            <CardHeader
                                title={
                                    <AppBar position="static" style={{ textAlign: "left", borderRadius: "5px", backgroundColor: "#1d0a5b" }}>
                                        <Toolbar style={{ minHeight: "10px" }}>
                                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} minHeight="10px" align="center">
                                                <span>Order Information</span>
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                }>
                            </CardHeader>
                            <CardContent>
                                <Grid container rowSpacing={1.5} columnSpacing={{ sx: 1, sm: 2, md: 2 }} >
                                    <React.Fragment>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="RLens"
                                                select
                                                label="R Lens"
                                                fullWidth
                                                size="small"
                                                value={RLens}
                                                onChange={(event) => setRLens(event.target.value)}
                                                error={RLens ? false : true}
                                            >
                                                {RLensList.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="LLens"
                                                select
                                                label="L Lens"
                                                fullWidth
                                                size="small"
                                                value={LLens}
                                                onChange={(event) => setLLens(event.target.value)}
                                            // helperText="Please select your currency"
                                            >
                                                {LLensList.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6} style={{ display: "flex" }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked size="small" value={RDCheck}
                                                        onChange={(event) => setRDCheck(event.target.checked)} />}
                                                    label="D" />
                                            </FormGroup>
                                            <TextField
                                                required
                                                name="DRSPH"
                                                label="SPH"
                                                value={DRSPH}
                                                onChange={(event) => setDRSPH(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                disabled={RLens ? false : true}
                                            />
                                            <TextField
                                                required
                                                name="DRCYL"
                                                label="CYL"
                                                value={DRCYL}
                                                onChange={(event) => setDRCYL(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                type="number"
                                                disabled={RLens ? false : true}
                                            />
                                            <TextField
                                                required
                                                name="DRAXIS"
                                                label="AXIS"
                                                value={DRAXIS}
                                                onChange={(event) => setDRAXIS(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                type="number"
                                                disabled={RLens ? false : true}
                                            />
                                            <TextField
                                                required
                                                name="DRADD"
                                                label="ADD"
                                                value={DRADD}
                                                onChange={(event) => { setDRADD(event.target.value); handleRLensADDChange(event.target.value) }}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                type="number"
                                                disabled={RLens ? false : true}
                                            />
                                        </Grid>
                                        <Grid item xs={6} style={{ display: "flex" }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked size="small"
                                                        value={LDCheck}
                                                        onChange={(event) => setLDCheck(event.target.checked)}
                                                    />}
                                                    label="D" />
                                            </FormGroup>
                                            <TextField
                                                required
                                                name="DLSPH"
                                                label="SPH"
                                                value={DLSPH}
                                                onChange={(event) => setDLSPH(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                disabled={LLens ? false : true}
                                            />
                                            <TextField
                                                required
                                                name="DLCYL"
                                                label="CYL"
                                                value={DLCYL}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                disabled={LLens ? false : true}
                                            />
                                            <TextField
                                                required
                                                name="DLAXIS"
                                                label="AXIS"
                                                value={DLAXIS}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                disabled={LLens ? false : true}
                                            />
                                            <TextField
                                                required
                                                name="DLADD"
                                                label="ADD"
                                                value={DLADD}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                disabled={LLens ? false : true}
                                            />
                                        </Grid>
                                        <Grid item xs={6} style={{ display: "flex" }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked size="small"
                                                        value={RNCheck}
                                                        onChange={(event) => setRNCheck(event.target.checked)}
                                                    />}
                                                    label="N" />
                                            </FormGroup>
                                            <TextField
                                                required
                                                name="NRSPH"
                                                label="SPH"
                                                value={NRSPH}
                                                onChange={(event) => setNRSPH(event.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            <TextField
                                                required
                                                name="NRCYL"
                                                label="CYL"
                                                value={NRCYL}
                                                fullWidth
                                                onChange={(event) => setNRCYL(event.target.value)}
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                            />
                                            <TextField
                                                required
                                                name="NRAXIS"
                                                label="AXIS"
                                                fullWidth
                                                value={NRAXIS}
                                                onChange={(event) => setNRAXIS(event.target.value)}
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                inputProps={{ readOnly: true }}
                                                disabled
                                                hidden
                                            />
                                        </Grid>
                                        <Grid item xs={6} style={{ display: "flex" }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked size="small"
                                                        value={LNCheck}
                                                        onChange={(event) => setLNCheck(event.target.checked)} />}
                                                    label="N" />
                                            </FormGroup>
                                            <TextField
                                                required
                                                name="NLSPH"
                                                label="SPH"
                                                value={NLSPH}
                                                fullWidth
                                                onChange={(event) => setNLSPH(event.target.value)}
                                                variant="outlined"
                                                size="small"
                                            />
                                            <TextField
                                                required
                                                name="NLCYL"
                                                label="CYL"
                                                value={NLCYL}
                                                fullWidth
                                                onChange={(event) => setNLCYL(event.target.value)}
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                            />
                                            <TextField
                                                required
                                                name="NLAXIS"
                                                label="AXIS"
                                                value={NLAXIS}
                                                fullWidth
                                                onChange={(event) => setNLAXIS(event.target.value)}
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ marginLeft: "2px" }}
                                                inputProps={{ readOnly: true }}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <TextField
                                                required
                                                name="IPD"
                                                label="IPD"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormGroup sx={{ alignItems: "start" }}>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Grinding"
                                                    labelPlacement="start"
                                                    value={isGrinding}
                                                    onChange={(event) => setisGrinding(event.target.checked)}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={6}></Grid>

                                        <Grid item xs={12}><Divider />
                                            <Chip label="Frame Details" size="small" />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormGroup sx={{ alignItems: "start" }}>
                                                <FormControlLabel
                                                    control={<Switch />}
                                                    label="Customer Frame"
                                                    labelPlacement="start"
                                                    value={isCustomerFrame}
                                                    onChange={(event) => setisCustomerFrame(event.target.checked)}
                                                />
                                                <FormHelperText sx={{ color: "#e66464" }}>Click to switch customer frame</FormHelperText>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                required
                                                label="Frame BarCode"
                                                fullWidth
                                                value={FrameBarCode}
                                                onChange={(event) => setFrameBarCode(event.target.value)}
                                                variant="outlined"
                                                size="small"
                                                disabled={isCustomerFrame ? true : false}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="Framedetails"
                                                label="Frame Details"
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                rows={2}
                                            />
                                        </Grid>

                                        <Grid item xs={12}><Divider />
                                            <Chip label="Price" size="small" />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="RightLensPrice"
                                                label="Right Lens Price"
                                                fullWidth
                                                value={RightLensPrice}
                                                onChange={(e) => setRightLensPrice(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="LeftLensPrice"
                                                label="Left Lens Price"
                                                fullWidth
                                                value={LeftLensPrice}
                                                onChange={(e) => setLeftLensPrice(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="FramePrice"
                                                label="Frame Price"
                                                fullWidth
                                                value={FramePrice}
                                                onChange={(e) => setFramePrice(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="SumAmount"
                                                label="Sum Amount"
                                                fullWidth
                                                value={SumAmount}
                                                variant="outlined"
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                name="Discount"
                                                label="Discount"
                                                fullWidth
                                                value={Discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                            />
                                            {DiscountDDL.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Grid>
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="AdvanceAmount"
                                                label="Advance Pay"
                                                fullWidth
                                                value={AdvanceAmount}
                                                onChange={(e) => setAdvanceAmount(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                shrink={AdvanceAmount ? true : false}
                                            />
                                        </Grid>
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="FinalAmount"
                                                label="Final Price"
                                                fullWidth
                                                value={FinalAmount}
                                                variant="outlined"
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                name="DueAmount"
                                                label="Due Amount"
                                                fullWidth
                                                value={DueAmount}
                                                variant="outlined"
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                    </React.Fragment>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Box sx={{ width: "100%", textAlign: "right" }} mt={2}>
                                    <Button
                                        variant="contained"
                                        style={{ borderRadius: 10, marginRight: "10px" }}
                                        onClick={handleSubmitClick}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>

                </Box>
            </Container>
        </React.Fragment >
    );
}

export default CustomerOrder;