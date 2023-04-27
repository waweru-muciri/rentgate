import React from "react";
import { connect } from "react-redux";
import {
    firebaseSignOutUser, setPaginationPage, toggleDrawer
} from "../actions/actions";
import {
    withRouter,
    Link,
} from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MoneyIcon from "@mui/icons-material/Money";
import ContactsIcon from "@mui/icons-material/Contacts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HouseIcon from "@mui/icons-material/House";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NoteIcon from '@mui/icons-material/Note';
import LockIcon from '@mui/icons-material/Lock';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ImportExportIcon from '@mui/icons-material/ImportExport';


const navigationLinks = [
    { text: "Home", to: "/app/", icon: <DashboardIcon /> },
    { text: "Tenants", to: "/app/contacts", icon: <ContactsIcon /> },
    { text: "User Management", to: "/app/users", icon: <GroupAddIcon /> },
    { text: "Email", to: "/app/emails", icon: <ContactMailIcon /> },
    { text: "Account Settings", to: "/app/account-settings", icon: <SettingsIcon /> },
    { text: "Documents Templates", to: "/app/documents-templates", icon: <ImportExportIcon /> },
];

const othersLinkNestedLinks = [
    { text: "Vacating Notices", to: "/app/notices", icon: <NoteIcon /> },
    { text: "Maintenance Requests", to: "/app/maintenance-requests", icon: <EventNoteIcon /> },
    { text: "To-Dos", to: "/app/to-dos", icon: <AssignmentIcon /> },
];

const propertyLinkNestedLinks = [
    { text: "Properties", to: "/app/properties", icon: <ApartmentIcon /> },
    { text: "Rental Agreements", to: "/app/leases", icon: <WorkIcon /> },
    { text: "Meter Readings", to: "/app/meter-reading", icon: <MonetizationOnIcon /> },
];

const reportLinkNestedLinks = [
    // *** NOTE *** include relevant data points on each of these modules for easy reference.
    //show income here from all charges and provide a way to filter the charges according to type, 
    //show payments received from these charges and any outstanding balances
    //show outstanding balances on tenant statements
    {
        text: "Outstanding Balances",
        to: "/app/reports/outstanding-balances",
        icon: <MoneyOffIcon />,
    },
    {
        text: "Properties Performance",
        to: "/app/reports/property-performance",
        icon: <ShowChartIcon />,
    },
    {
        text: "Properties Income Statement",
        to: "/app/reports/property-income",
        icon: <AssessmentIcon />,
    },
    {
        text: "Tenant Statements",
        to: "/app/reports/tenant-statements",
        icon: <AttachMoneyIcon />,
    },
    //show income and expenses received from each property and show net income for each of the expenses
    //show property occupancy rate over periods of time and provide for filtering criteria by property, unit, 
    //generate tenant statements and filtering criteria by each property and others
    //show total of values and other relevant data points
];

const accountsLinkNestedLinks = [
    { text: "Rent Roll", to: "/app/rent-roll", icon: <ScheduleIcon /> },
    { text: "Other Charges", to: "/app/other-charges", icon: <MoneyIcon /> },
    { text: "Payments", to: "/app/payments", icon: <PaymentIcon /> },
    { text: "Credit Notes", to: "/app/credit-notes", icon: <CreditCardIcon /> },
    {
        text: "Property Expenses",
        to: "/app/property_expenditure",
        icon: <AccountBalanceWalletIcon />,
    },
];

let AppNavLayout = ({
    setDrawerToggleState,
    handleUserSignOut,
    drawerOpen,
    selectedTab,
    setSelectedTab,
    companyProfile,
    classes,
}) => {
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setDrawerToggleState(!drawerOpen);
    };

    const handleListItemClick = (indexObject) => {
        setSelectedTab(Object.assign({}, selectedTab, { ...indexObject }));
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        {companyProfile.company_name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{ onBackdropClick: handleDrawerToggle }}
                BackdropProps={{ invisible: true }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                                <ChevronRightIcon />
                            )}
                    </IconButton>
                </div>
                <Divider />
                <List component="div" disablePadding>
                    {navigationLinks.slice(0, 2).map((linkItem, parentIndex) => (
                        <React.Fragment key={parentIndex}>
                            <ListItem
                                component={Link}
                                to={linkItem.to}
                                button
                                key={linkItem.text}
                                selected={selectedTab.parent === parentIndex}
                                onClick={(event) => {
                                    handleListItemClick({
                                        parent: parentIndex,
                                    });
                                    handleDrawerToggle();
                                }}
                            >
                                <ListItemIcon>{linkItem.icon}</ListItemIcon>
                                <ListItemText primary={linkItem.text} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                    {/* Property Navigation Links */}
                    <ListItem
                        button
                        key={40}
                        onClick={(event) => {
                            event.preventDefault();
                            if (selectedTab.parent === 40) {
                                handleListItemClick({ parent: -1 });
                            }
                            else {
                                handleListItemClick({ parent: 40 });
                            }
                        }}
                    >
                        <ListItemIcon>
                            <HouseIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Properties"} />
                        {selectedTab.parent === 40 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={selectedTab.parent === 40}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {propertyLinkNestedLinks.map(
                                (innerLinkItem, innerLinkItemIndex) => (
                                    <ListItem
                                        component={Link}
                                        to={innerLinkItem.to}
                                        button
                                        className={classes.nested}
                                        key={innerLinkItem.text}
                                        selected={
                                            selectedTab.parent === 40 &&
                                            selectedTab.nestedLink === 'properties' + innerLinkItemIndex
                                        }
                                        onClick={(event) => {
                                            handleDrawerToggle();
                                            handleListItemClick({
                                                parent: 40,
                                                nestedLink: 'properties' + innerLinkItemIndex,
                                            });
                                        }}
                                    >
                                        <ListItemIcon>{innerLinkItem.icon}</ListItemIcon>
                                        <ListItemText primary={innerLinkItem.text} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Collapse>
                    {/*accounts tab here*/}
                    <ListItem
                        button
                        key={20}
                        onClick={(event) => {
                            event.preventDefault();
                            if (selectedTab.parent === 20) {
                                handleListItemClick({ parent: -1 });
                            }
                            else {
                                handleListItemClick({ parent: 20 });
                            }
                        }}
                    >
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Accounts"} />
                        {selectedTab.parent === 20 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={selectedTab.parent === 20}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {accountsLinkNestedLinks.map(
                                (innerLinkItem, innerLinkItemIndex) => (
                                    <ListItem
                                        component={Link}
                                        to={innerLinkItem.to}
                                        button
                                        className={classes.nested}
                                        key={innerLinkItem.text}
                                        selected={
                                            selectedTab.parent === 20 &&
                                            selectedTab.nestedLink === 'account' + innerLinkItemIndex
                                        }
                                        onClick={(event) => {
                                            handleDrawerToggle();
                                            handleListItemClick({
                                                parent: 20,
                                                nestedLink: 'account' + innerLinkItemIndex,
                                            });
                                        }}
                                    >
                                        <ListItemIcon>{innerLinkItem.icon}</ListItemIcon>
                                        <ListItemText primary={innerLinkItem.text} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Collapse>
                    {/* others  tab here*/}
                    <ListItem
                        button
                        key={10}
                        onClick={(event) => {
                            event.preventDefault();
                            if (selectedTab.parent === 10) {
                                handleListItemClick({ parent: -1 });
                            }
                            else {
                                handleListItemClick({ parent: 10 });
                            }
                        }}
                    >
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Events"} />
                        {selectedTab.parent === 10 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={selectedTab.parent === 10}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {othersLinkNestedLinks.map(
                                (innerLinkItem, innerLinkItemIndex) => (
                                    <ListItem
                                        component={Link}
                                        to={innerLinkItem.to}
                                        button
                                        className={classes.nested}
                                        key={innerLinkItem.text}
                                        selected={
                                            selectedTab.parent === 10 &&
                                            selectedTab.nestedLink === 'other' + innerLinkItemIndex
                                        }
                                        onClick={(event) => {
                                            handleDrawerToggle();
                                            handleListItemClick({
                                                parent: 10,
                                                nestedLink: 'other' + innerLinkItemIndex,
                                            });
                                        }}
                                    >
                                        <ListItemIcon>{innerLinkItem.icon}</ListItemIcon>
                                        <ListItemText primary={innerLinkItem.text} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Collapse>
                    {/*reports tab here*/}
                    <ListItem
                        button
                        key={30}
                        onClick={(event) => {
                            event.preventDefault();
                            if (selectedTab.parent === 30) {
                                handleListItemClick({ parent: -1 });
                            }
                            else {
                                handleListItemClick({ parent: 30 });
                            }
                        }}
                    >
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Reports"} />
                        {selectedTab.parent === 30 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={selectedTab.parent === 30}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {reportLinkNestedLinks.map(
                                (innerLinkItem, innerLinkItemIndex) => (
                                    <ListItem
                                        component={Link}
                                        to={innerLinkItem.to}
                                        button
                                        className={classes.nested}
                                        key={innerLinkItem.text}
                                        selected={
                                            selectedTab.parent === 30 &&
                                            selectedTab.nestedLink === 'report' + innerLinkItemIndex
                                        }
                                        onClick={(event) => {
                                            handleDrawerToggle();
                                            handleListItemClick({
                                                parent: 30,
                                                nestedLink: 'report' + innerLinkItemIndex,
                                            });
                                            handleDrawerToggle();
                                        }}
                                    >
                                        <ListItemIcon>{innerLinkItem.icon}</ListItemIcon>
                                        <ListItemText primary={innerLinkItem.text} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Collapse>
                    {navigationLinks.slice(2).map((linkItem, listIndex) => {
                        const parentIndex = listIndex + 2;
                        return (
                            <React.Fragment key={parentIndex}>
                                <ListItem
                                    component={Link}
                                    to={linkItem.to}
                                    button
                                    key={linkItem.text}
                                    selected={selectedTab.parent === parentIndex}
                                    onClick={(event) => {
                                        handleListItemClick({
                                            parent: parentIndex,
                                        });
                                        handleDrawerToggle();
                                    }}
                                >
                                    <ListItemIcon>{linkItem.icon}</ListItemIcon>
                                    <ListItemText primary={linkItem.text} />
                                </ListItem>
                            </React.Fragment>
                        )
                    })}
                    <ListItem
                        button
                        key={"sign-out-btn"}
                        selected={selectedTab.parent === "sign-out-btn"}
                        onClick={(event) => {
                            handleUserSignOut();
                        }}
                    >
                        <ListItemIcon><LockIcon /></ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItem>
                </List>
            </Drawer>
            <div className={classes.drawerHeader} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        companyProfile: state.companyProfile[0] || {},
        drawerOpen: state.drawerOpen,
        selectedTab: state.selectedTab,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleUserSignOut: () => dispatch(firebaseSignOutUser()),
        setSelectedTab: (index) => dispatch(setPaginationPage(index)),
        setDrawerToggleState: (toggleValue) => dispatch(toggleDrawer(toggleValue)),
    };
};

AppNavLayout = connect(mapStateToProps, mapDispatchToProps)(AppNavLayout);

export default withRouter(AppNavLayout);
