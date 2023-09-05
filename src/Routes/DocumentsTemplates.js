import Layout from "../components/PrivateLayout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { handleDelete, itemsFetchData } from "../actions/actions";
import CommonTable from "../components/table/commonTable";
import { withRouter } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { commonStyles } from "../components/commonStyles";
import { exportDataUploadTemplate } from "../assets/PrintingHelper";

const ItemsToGenerateTemplatesFor = [
    { name: "Contacts", id: "contacts" },
    { name: "Rent Charges", id: "rent_charges" },
    { name: "Properties", id: "properties" },
    { name: "Rental Units", id: "rental_units" },
]

const emailsTableHeadCells = [
    { id: "template_name", numeric: false, disablePadding: true, label: "Document Name" },
    { id: "last_edit", numeric: false, disablePadding: true, label: "Last Edit" },
    { id: "edit", numeric: false, disablePadding: true, label: "Edit" },
    { id: "delete", numeric: false, disablePadding: true, label: "Delete" },
];

let DocumentsTemplatesPage = ({
    fetchData,
    emailTemplates,
    match,
    handleItemDelete
}) => {
    let classes = commonStyles();
    const [emailItems, setEmailItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [itemToGenerateTemplate, setItemToGenerateTemplate] = useState("");

    const generateItemTemplate = (event) => {
        event.preventDefault();
        let docTitle;
        let headCellsToPrint;
        switch (itemToGenerateTemplate) {
            case "contacts":
                docTitle = "Contacts Upload Template"
                headCellsToPrint = ["title", "gender", "id_number", "first_name", "last_name",
                    "personal_phone_number"]
                break;

            case "properties":
                docTitle = "Properties Upload Template"
                headCellsToPrint = ["ref", "address", "city", "postal_code"]
                break;

            case "rental_units":
                docTitle = "Rental Units Upload Template"
                headCellsToPrint = ["ref", "unit_type", "beds", "sqm", "baths"]
                break;

            case "rent_charges":
                docTitle = "Rent Charges Upload Template"
                headCellsToPrint = ["charge_amount", "charge_date", "due_date"]
                break;

            default:
                headCellsToPrint = []
                break;
        }
        exportDataUploadTemplate(docTitle, docTitle, headCellsToPrint, docTitle)
    }

    useEffect(() => {
		fetchData(['email-templates']);
	}, [fetchData]);

    useEffect(() => {
        setEmailItems(emailTemplates);
    }, [emailTemplates]);

    return (
        <Layout pageTitle="Documents Templates">
            <Grid
                container
                spacing={3}
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <PageHeading text="Documents Templates" />
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
                        <Button
                            type="button"
                            color="primary"
                            variant="contained"
                            size="medium"
                            startIcon={<AddIcon />}
                            component={Link}
                            to={`${match.url}/new`}
                        >
                            NEW
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="button"
                            color="primary"
                            variant="contained"
                            size="medium"
                            startIcon={<EditIcon />}
                            disabled={!selected.length}
                            component={Link}
                            to={`${match.url}/${selected[0]}/edit`}
                        >
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Items Upload Templates</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        border={1}
                        borderRadius="borderRadius"
                        borderColor="grey.400"
                    >
                        <form
                            className={classes.form}
                            id="templateUploadGenerateForm"
                        >
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justify="center"
                                direction="row"
                            >
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        fullWidth
                                        select
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        id="item_to_generate_template"
                                        name="item_to_generate_template"
                                        label="Item to Generate Template"
                                        value={itemToGenerateTemplate}
                                        onChange={(event) => setItemToGenerateTemplate(event.target.value)}
                                    >
                                        {ItemsToGenerateTemplatesFor.map(
                                            (itemToGenerateTemplateFor, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={itemToGenerateTemplateFor.id}
                                                >
                                                    {itemToGenerateTemplateFor.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Button
                                        onClick={generateItemTemplate}
                                        disabled={!itemToGenerateTemplate}
                                        type="submit"
                                        form="templateUploadGenerateForm"
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                    >
                                        Generate Upload Template
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Email Templates</Typography>
                </Grid>
                <Grid item xs={12}>
                    <CommonTable
                        selected={selected}
                        setSelected={setSelected}
                        rows={emailItems}
                        headCells={emailsTableHeadCells}
                        handleDelete={handleItemDelete}
                        deleteUrl={"email-templates"}
                        noDetailsCol
                    />
                </Grid>

            </Grid>
        </Layout>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        emailTemplates: state.emailTemplates,
        match: ownProps.match,
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        fetchData: (collectionsUrls) => dispatch(itemsFetchData(collectionsUrls)),
		handleItemDelete: (itemId, url) => dispatch(handleDelete(itemId, url)),
	};
};

DocumentsTemplatesPage = connect(mapStateToProps, mapDispatchToProps)(DocumentsTemplatesPage);

export default withRouter(DocumentsTemplatesPage);
