import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import UndoIcon from "@mui/icons-material/Undo";
import PrintIcon from "@mui/icons-material/Print";
import ExportToExcelBtn from "../components/ExportToExcelBtn";
import PrintArrayToPdf from "../components/PrintArrayToPdfBtn";
import CommonTable from "../components/table/commonTable";
import {getTransactionsFilterOptions, currencyFormatter, getStartEndDatesForPeriod } from "../assets/commonAssets";
import { parse, isWithinInterval } from "date-fns";
import { printInvoice } from "../assets/PrintingHelper";

const TRANSACTIONS_FILTER_OPTIONS = getTransactionsFilterOptions()

const headCells = [
    { id: "charge_label", numeric: false, disablePadding: true, label: "Charge Type" },
    { id: "charge_date", numeric: false, disablePadding: true, label: "Charge Date", },
    { id: "due_date", numeric: false, disablePadding: true, label: "Due Date", },
    { id: "charge_amount", numeric: true, disablePadding: true, label: "Charge Amount", },
    { id: "payed_status", numeric: false, disablePadding: true, label: "Payments Made" },
    { id: "payed_amount", numeric: true, disablePadding: true, label: "Total Amounts Paid" },
    { id: "balance", numeric: false, disablePadding: true, label: "Balance" },
];

let TenantChargesStatementPage = ({
    tenantDetails,
    tenantTransactionCharges,
    handleItemDelete,
    classes,
}) => {
    let [tenantChargesItems, setTenantChargesItems] = useState([]);
    let [filteredChargeItems, setFilteredChargeItems] = useState([]);
    let [chargeType, setChargeTypeFilter] = useState("");
    let [periodFilter, setPeriodFilter] = useState("month-to-date");
    const [selected, setSelected] = useState([]);
    const CHARGE_TYPES = Array.from(new Set(tenantChargesItems
        .map((chargeItem) => (JSON.stringify({ label: chargeItem.charge_label, value: chargeItem.charge_type })))))
        .map(chargeType => JSON.parse(chargeType))

    const totalRentCharges = filteredChargeItems.filter(charge => charge.charge_type === 'rent')
        .reduce((total, currentValue) => {
            return total + parseFloat(currentValue.charge_amount) || 0
        }, 0)

    const totalOtherCharges = filteredChargeItems.filter(charge => charge.charge_type !== 'rent')
        .reduce((total, currentValue) => {
            return total + parseFloat(currentValue.charge_amount) || 0
        }, 0)

    const totalRentPayments = filteredChargeItems.filter(payment => payment.charge_type === 'rent')
        .reduce((total, currentValue) => {
            return total + parseFloat(currentValue.payed_amount) || 0
        }, 0)

    const totalOtherPayments = filteredChargeItems.filter(payment => payment.charge_type !== 'rent')
        .reduce((total, currentValue) => {
            return total + parseFloat(currentValue.payed_amount) || 0
        }, 0)

    useEffect(() => {
        setTenantChargesItems(tenantTransactionCharges);
        setFilteredChargeItems(filterChargesByCriteria(tenantTransactionCharges));
    }, [tenantTransactionCharges]);

    const filterChargesByCriteria = (chargesToFilter) => {
        let filteredStatements = chargesToFilter
        if (periodFilter) {
            const { startDate, endDate } = getStartEndDatesForPeriod(periodFilter)
            filteredStatements = filteredStatements.filter((chargeItem) => {
                const chargeItemDate = parse(chargeItem.charge_date, 'yyyy-MM-dd', new Date())
                return isWithinInterval(chargeItemDate, { start: startDate, end: endDate })
            })
        }
        filteredStatements = filteredStatements.filter(({ charge_type }) =>
            !chargeType ? true : charge_type === chargeType
        )
        return filteredStatements;
    }

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        //filter the tenantTransactionCharges according to the search criteria here
        setFilteredChargeItems(filterChargesByCriteria(tenantChargesItems));
    };

    const resetSearchForm = (event) => {
        event.preventDefault();
        setChargeTypeFilter("");
        setPeriodFilter("month-to-date");
    };

    return (
        <Grid container spacing={2} justify="center" direction="column">
            <Grid item sm={12}>
                <Typography variant="h6">Tenant Charges Statement - {tenantDetails.first_name} {tenantDetails.last_name} </Typography>
            </Grid>
            <Grid item container spacing={2} alignItems="center" direction="row">
                <Grid item>
                    <ExportToExcelBtn
                        disabled={!selected.length}
                        reportName={`${tenantDetails.first_name} ${tenantDetails.last_name} Charges Record`}
                        reportTitle={'Tenant Charges Data'}
                        headCells={headCells}
                        dataToPrint={tenantChargesItems.filter(({ id }) => selected.includes(id))}
                    />
                </Grid>
                <Grid item>
                    <PrintArrayToPdf
                        disabled={!selected.length}
                        reportName={'Tenant Charges Data'}
                        reportTitle={`${tenantDetails.first_name} ${tenantDetails.last_name} Charges Record`}
                        headCells={headCells}
                        dataToPrint={tenantChargesItems.filter(({ id }) => selected.includes(id))}
                    />
                </Grid>
                <Grid item>
                    <Button
                        aria-label="Print Invoice"
                        variant="contained"
                        size="medium"
                        color="primary"
                        disabled={!selected.length}
                        onClick={() => {
                            printInvoice(
                                tenantDetails,
                                tenantChargesItems.filter(({ id }) => selected.includes(id))
                            )
                        }}
                        startIcon={<PrintIcon />}>
                        Print Invoice
                    </Button>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item sm={12}>
                    <Box border={1} borderRadius="borderRadius" borderColor="grey.400">
                        <form
                            className={classes.form}
                            id="contactSearchForm"
                            onSubmit={handleSearchFormSubmit}
                        >
                            <Grid
                                container
                                justify="center"
                                direction="column"
                            >
                                <Grid item container spacing={2} justify="center" direction="row">
                                    <Grid item md={6} xs={12}>
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
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            select
                                            variant="outlined"
                                            name="chargeType"
                                            label="Charge Type"
                                            id="chargeType"
                                            onChange={(event) => {
                                                setChargeTypeFilter(
                                                    event.target.value
                                                );
                                            }}
                                            value={chargeType}
                                        >
                                            {CHARGE_TYPES.map(
                                                (charge_type, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={charge_type.value}
                                                    >
                                                        {charge_type.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
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
                                            form="contactSearchForm"
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
                                            form="contactSearchForm"
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
            </Grid>
            <Grid item container>
                <Grid item sm={12}>
                    <Box border={1} borderRadius="borderRadius" borderColor="grey.400" className={classes.form}>
                        <Grid container direction="row" spacing={1}>
                            <Grid item container md={4} sm={12}>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" align="center">
                                        Total Rent Charges: {currencyFormatter.format(totalRentCharges)}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" align="center">
                                        Total Other Charges: {currencyFormatter.format(totalOtherCharges)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container md={4} sm={12}>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" align="center">
                                        Total Rent Payments: {currencyFormatter.format(totalRentPayments)}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" align="center">
                                        Total Other Payments: {currencyFormatter.format(totalOtherPayments)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container md={4} sm={12}>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" align="center">
                                        Outstanding Rent Balances: {currencyFormatter.format((totalRentCharges - totalRentPayments))}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" align="center">
                                        Other Charges Outstanding Balances: {currencyFormatter.format((totalOtherPayments - totalOtherPayments))}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <CommonTable
                        selected={selected}
                        setSelected={setSelected}
                        rows={filteredChargeItems}
                        headCells={headCells}
                        noEditCol
                        noDeleteCol
                        deleteUrl={'transactions-charges'}
                        handleDelete={handleItemDelete}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TenantChargesStatementPage;
