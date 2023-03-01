import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable, getOptions, getColumns } from 'bento-components';
import globalData from '../../bento/siteWideConfig';
import {
  table, programListingIcon, externalLinkIcon,
} from '../../bento/studiesData';
import Stats from '../../components/Stats/AllStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
} from '../dashboardTab/store/dashboardReducer';

const Studies = ({ classes, data }) => {
  const redirectTo = (program) => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'programs',
      groupName: 'Program',
      isChecked: true,
      name: program.rowData[0],
      section: 'Filter By Cases',
    }]);
  };
  const draftCloumns = getColumns(table, classes, data, externalLinkIcon, '/explore', redirectTo, '', globalData.replaceEmptyValueWith)

  const columns = draftCloumns

  return (
    <>
      <Stats />
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
            className={classes.header}
          >
            <Grid item xs className={classes.subHeader}>
              <div className={classes.logo}>
                <img
                  src={programListingIcon.src}
                  alt={programListingIcon.alt}
                />
              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                  <span>
                    <Typography>
                      <span className={classes.headerMainTitle}>{table.title}</span>
                    </Typography>
                  </span>
                </div>
              </div>
            </Grid>
          </Grid>

          { table.display ? (
            <div id="table_programs" className={classes.tableDiv}>
              <Grid container>
                <Grid item xs={12}>
                  <CustomDataTable
                    data={data[table.dataField]}
                    columns={columns}
                    options={getOptions(table, classes)}
                    className={classes.customDataTable}
                  />
                </Grid>
              </Grid>
            </div>
          ) : ''}
        </div>

      </div>
    </>
  );
};

const styles = (theme) => ({
  customDataTable:{
    '& .MuiTableRow-head': {
      borderBottom: '3px solid #1E66A4',
      borderTop: '3.67px solid #1E66A4',
    },
    '& .MuiTableCell-head': {
      fontFamily: 'Open Sans',
      fontWeight: 700,
      fontSize: '15px',
      lineHeight: '20.43px',
      letterSpacing: '-0.02em',
      color: '#0F253A',
      textDecoration: 'none',
    },
    '& .MuiTableCell-head:first-child': {
      paddingLeft: '20px',
    },
    '& .MuiTableCell-body': {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '15.46px',
      color: '#003F74',
    },
    '& .MuiTableFooter-root': {
      borderTop: '3px solid #F4F4F4',
    },
    '& .MuiTableCell-body:nth-child(3)': {
      maxWidth: '400px',
    },
  },
  link: {
    fontFamily: 'Open Sans',
    fontSize: '15px',
    letterSpacing: '-0.02em',
    textDecorationLine: 'underline',
    lineHeight: '17px',
    color: '#58930F',
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: 'auto',
    paddingTop: '74px',
    maxWidth: '1350px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Lato Regular","Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#FFFFFF',
  },
  header: {
    background: '#FFFFFF',
    borderBottom: '#1E66A4 3px solid',
    // height: '128px',
    marginBottom: '9px',
    position: 'relative',
  },
  subHeader: {
    height: '51px',
    background: 'linear-gradient(270deg, #064667 20.89%, #56A6D0 81.63%)',
  },
  headerMainTitle: {
    fontFamily: 'Poppins',
    letterSpacing: '-0.02em',
    color: '#FFFFFF',
    bottom: '7px',
    fontSize: '26px',
    fontWeight: 300,
    position: 'absolute',
    lineHeight: '27.7px',
    marginLeft: '0px',
  },

  headerTitle: {
    maxWidth: '1350px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    top: '-23px',
    marginLeft: '10px',
    width: '100px',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  tableContainer: {
    background: '#FFFFFF',
    padding: '0px 45px 121px 45px',
  },
  tableDiv: {
    margin: 'auto',
  },
  tableCell6: {
    width: '120px',
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
  linkSpan: {
    display: '-webkit-box',
  },
});

export default withStyles(styles, { withTheme: true })(Studies);
