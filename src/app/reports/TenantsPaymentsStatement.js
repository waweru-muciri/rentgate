import Grid from "@mui/material/Grid";
import PageHeading from "../components/PageHeading";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/material/Search";
import UndoIcon from "@mui/material/Undo";
import ExportToExcelBtn from "../components/ExportToExcelBtn";
import CommonTable from "../components/table/commonTable";
import PrintArrayToPdf from "../components/PrintArrayToPdfBtn";
import { getStartEndDatesForPeriod, getTransactionsFilterOptions } from "../assets/commonAssets";
import { parse, isWithinInterval } from "date-fns";
import Autocomplete from '@material-ui/lab/Autocomplete';


const TRANSACTIONS_FILTER_OPTIONS = getTransactionsFilterOptions()

const headCells = [
    { id: "tenant_name", numeric: false, disablePadding: true, label: "Tenant Name" },
    { id: "tenant_id_number", numeric: false, disablePadding: true, label: "Tenant ID" },
    { id: "unit_ref", numeric: false, disablePadding: true, label: "Unit Number/Ref" },
    { id: "payment_date", numeric: false, disablePadding: true, label: "Payment Date" },
    { id: "payment_label", numeric: false, disablePadding: true, label: "Payment Type" },
    { id: "payment_amount", numeric: true, disablePadding: true, label: "Payment Amount" },
    { id: "memo", numeric: false, disablePadding: true, label: "Payment Notes/Memo" },
    { id: "edit", numeric: false, disablePadding: true, label: "Edit" },
    { id: "delete", numeric: false, disablePadding: true, label: "Delete" },
];


let TenantsPaymentsPage = ({
    rentalPayments,
    contacts,
    properties,
    classes,
}) => {
    let [filteredPaymentsItems, setFilteredPaymentsItems] = useState([]);
    let [propertyFilter, setPropertyFilter] = useState("all");
    let [periodFilter, setPeriodFilter] = useState("month-to-date");
    let [fromDateFilter, setFromDateFilter] = useState("");
    let [toDateFilter, setToDateFilter] = useState("");
    let [contactFilter, setContactFilter] = useState(null);

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setFilteredPaymentsItems(filterPaymentsByCriteria(rentalPayments));
    }, [rentalPayments]);

    const filterPaymentsByCriteria = (paymentsToFilter) => {
        //filter the payments according to the search criteria here
        let filteredPayments = paymentsToFilter;
        //filter the payments according to the search criteria here
        if (periodFilter) {
            const { startDate, endDate } = getStartEndDatesForPeriod(periodFilter)
            filteredPayments = filteredPayments.filter((payment) => {
                const paymentDate = parse(payment.payment_date, 'yyyy-MM-dd', new Date())
                return isWithinInterval(paymentDate, { start: startDate, end: endDate })
            })
        }
        filteredPayments = filteredPayments
            .filter(({ payment_date, tenant_id, property_id }) =>
                (!fromDateFilter ? true : payment_date >= fromDateFilter)
                && (!toDateFilter ? true : payment_date <= toDateFilter)
                && (propertyFilter === "all" ? true : property_id === propertyFilter)
                && (!contactFilter ? true : tenant_id === contactFilter.id)
            )
        return filteredPayments;
    }

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        setFilteredPaymentsItems(filterPaymentsByCriteria(rentalPayments));
    }

    const resetSearchForm = (event) => {
        event.preventDefault();
        setPropertyFilter("all");
        setPeriodFilter("month-to-date");
        setFromDateFilter("");
        setToDateFilter("");
        setContactFilter("");
    };

    return (
        <Grid
            container
            spacing={3}
            alignItems="center"
        >
            <Grid item key={2}>
                <PageHeading text={'Tenants Payments Statement'} />
            </Grid>
            <Grid
                container
                spacing={2}
                item
                alignItems="center"
                direction="row"
                key={1}
            >
                <Grid item>
                    <PrintArrayToPdf
                        disabled={!selected.length}
                        reportName={'Tenants Payments Records'}
                        reportTitle={'Tenants Payments Data'}
                        headCells={headCells}
                        dataToPrint={rentalPayments.filter(({ id }) => selected.includes(id))}
                    />
                </Grid>
                <Grid item>
                    <ExportToExcelBtn
                        disabled={!selected.length}
                        reportName={'Tenants Payments Records'}
                        reportTitle={'Tenants Payments Data'}
                        headCells={headCells}
                        dataToPrint={rentalPayments.filter(({ id }) => selected.includes(id))}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box
                    border={1}
                    borderRadius="borderRadius"
                    borderColor="grey.400"
                >
                    <form
                        className={classes.form}
                        id="tenantPaymentsSearchForm"
                        onSubmit={handleSearchFormSubmit}
                    >
                        <Grid
                            container
                            spacing={2}
                            justify="center"
                        >
                            <Grid item container spacing={2}>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item container xs={12} md={6} direction="row" spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="date"
                                                id="from_date_filter"
                                                name="from_date_filter"
                                                label="From Date"
                                                value={fromDateFilter}
                                                onChange={(event) => {
                                                    setFromDateFilter(
                                                        event.target.value
                                                    );
                                                }}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                type="date"
                                                name="to_date_filter"
                                                label="To Date"
                                                id="to_date_filter"
                                                onChange={(event) => {
                                                    setToDateFilter(event.target.value);
                                                }}
                                                value={toDateFilter}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            select
                                            id="period_filter"
                                            name="period_filter"
                                            label="Period"
                                            value={periodFilter}
                                            onChange={(event) => {
                                                setPeriodFilter(
                                                    event.target.value
                                                );
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            {TRANSACTIONS_FILTER_OPTIONS.map((filterOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={filterOption.id}
                                                >
                                                    {filterOption.text}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            select
                                            variant="outlined"
                                            name="property_filter"
                                            label="Property"
                                            id="property_filter"
                                            onChange={(event) => {
                                                setPropertyFilter(
                                                    event.target.value
                                                );
                                            }}
                                            value={propertyFilter}
                                        >
                                            <MenuItem key={"all"} value={"all"}>All</MenuItem>
                                            {properties.map(
                                                (property, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={property.id}
                                                    >
                                                        {property.ref}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Autocomplete
                                            id="contact_filter"
                                            options={contacts}
                                            getOptionSelected={(option, value) => option.id === value.id}
                                            name="contact_filter"
                                            onChange={(event, newValue) => {
                                                setContactFilter(newValue);
                                            }}
                                            value={contactFilter}
                                            getOptionLabel={(tenant) => tenant ? `${tenant.first_name} ${tenant.last_name}` : ''}
                                            style={{ width: "100%" }}
                                            renderInput={(params) => <TextField {...params} label="Tenant" variant="outlined" />}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={2}
                                item
                                justify="flex-end"
                                alignItems="center"
                                direction="row"
                                key={1}
                            >
                                <Grid item>
                                    <Button
                                        onClick={(event) => handleSearchFormSubmit(event)}
                                        type="submit"
                                        form="tenantPaymentsSearchForm"
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        startIcon={<SearchIcon />}
                                    >
                                        SEARCH
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={(event) => resetSearchForm(event)}
                                        type="reset"
                                        form="tenantPaymentsSearchForm"
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        startIcon={<UndoIcon />}
                                    >
                                        RESET
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <CommonTable
                    selected={selected}
                    setSelected={setSelected}
                    rows={filteredPaymentsItems}
                    headCells={headCells}
                />
            </Grid>

        </Grid>
    );
};


export default TenantsPaymentsPage;
