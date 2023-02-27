import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  CustomDataTable,
  cn,
  manipulateLinks,
  getOptions,
  getColumns,
  CustomActiveDonut,
} from 'bento-components';
import globalData from '../../bento/siteWideConfig';
import {
  pageTitle, table, externalLinkIcon,
  studyDetailIcon, breadCrumb, aggregateCount,
  pageSubTitle, leftPanel, rightPanel,
} from '../../bento/studyDetailData';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
} from '../dashboardTab/store/dashboardReducer';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import Widget from '../../components/Widgets/WidgetView';
import colors from '../../utils/colors';

const StudyView = ({ classes, data, theme }) => {
  const programData = data.programDetail;

  const redirectTo = () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'programs',
      groupName: 'Program',
      isChecked: true,
      name: programData.program_acronym,
      section: 'Filter By Cases',
    }]);
  };

  const redirectToArm = (programArm) => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'studies',
      groupName: 'Arm',
      isChecked: true,
      name: `${programArm.rowData[0]}: ${programArm.rowData[1]}`,
      section: 'Filter By Cases',
    }]);
  };

  const stat = {
    numberOfPrograms: 1,
    numberOfStudies: programData.num_subjects !== undefined ? programData.studies.length : 'undefined',
    numberOfSubjects: programData.num_subjects !== undefined ? programData.num_subjects : 'undefined',
    numberOfSamples: programData.num_samples !== undefined ? programData.num_samples : 'undefined',
    numberOfLabProcedures: programData.num_lab_procedures !== undefined ? programData.num_lab_procedures : 'undefined',
    numberOfFiles: programData.num_files !== undefined ? programData.num_files : 'undefined',
  };

  const breadCrumbJson = [{
    name: `${breadCrumb.label}`,
    to: `${breadCrumb.link}`,
    isALink: true,
  }];

  const updatedAttributesData = manipulateLinks(rightPanel.attributes);

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.topContainer}>
        <div className={classes.topTitle}>
          <span className={classes.parentPage}> Studies </span>
          <span className={classes.greaterSign}> {' > '} </span>
          <span className={classes.topStudyId}> {programData[pageTitle.dataField]} </span>
        </div>
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
                  src={studyDetailIcon.src}
                  alt={studyDetailIcon.alt}
                />
              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                  {pageTitle.label}{': '}{' '} <span className={classes.studyId}>{' '}{programData[pageTitle.dataField]} </span>
                </div>

                {aggregateCount.display ? (
                  <div className={classes.headerButton}>
                    <span className={classes.headerButtonLinkSpan}>
                      <Link
                        className={classes.headerButtonLink}
                        to={(location) => ({ ...location, pathname: `${aggregateCount.link}` })}
                        onClick={() => redirectTo()}
                      >
                        {' '}
                        <span className={classes.headerButtonLinkText}>{aggregateCount.labelText}</span>
                        <span className={classes.headerButtonColumn}>{': '}</span>
                        <span className={classes.headerButtonLinkNumber} id="program_detail_header_file_count">
      
                          {programData[aggregateCount.dataField]}
      
                        </span>
                      </Link>
                    </span>
                  </div>
                ) : ''}
              </div>
            </Grid>
          </Grid>

          <div className={classes.detailContainer}>

            <Grid container spacing={5}>
              <Grid item lg={6} sm={6} xs={12} container>
                <Grid container spacing={4} direction="row" className={classes.detailContainerLeft}>
                  {updatedAttributesData.slice(0, 6).map((attribute, index) => (
                    <Grid item xs={12}>
                      <div>
                        {
                        attribute.internalLink
                          ? (
                            <div>
                              <span className={classes.detailContainerHeader}>{attribute.label}</span>
                              <div>
                                <span className={classes.content}>
                                  {' '}
                                  <Link
                                    className={classes.link}
                                    to={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                  >
                                    {programData[attribute.dataField]}
                                  </Link>
                                  {' '}
                                </span>
                              </div>
                            </div>
                          )
                          : attribute.externalLink
                            ? (
                              <div>
                                <span
                                  className={classes.detailContainerHeader}
                                >
                                  {attribute.label}
                                </span>
                                <div>
                                  <span className={classes.content}>
                                    {' '}
                                    <a
                                      href={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={classes.link}
                                    >
                                      {programData[attribute.dataField]}
                                    </a>
                                    <img
                                      src={externalLinkIcon.src}
                                      alt={externalLinkIcon.alt}
                                      className={classes.externalLinkIcon}
                                    />
                                    {' '}
                                  </span>
                                </div>
                              </div>
                            )
                            : attribute.internalLinkToLabel
                              ? (
                                <div>
                                  <span
                                    className={classes.detailContainerHeaderLink}
                                  >
                                    <a href={`${programData[attribute.dataField]}`} rel="noopener noreferrer">{attribute.label}</a>
                                  </span>
                                </div>
                              )
                              : attribute.externalLinkToLabel
                                ? (
                                  <div>
                                    <span
                                      className={classes.detailContainerHeaderLink}
                                    >
                                      <a href={`${programData[attribute.dataField]}`} target="_blank" rel="noopener noreferrer">{attribute.label}</a>
                                      <img
                                        src={externalLinkIcon.src}
                                        alt={externalLinkIcon.alt}
                                        className={classes.externalLinkIcon}
                                      />
                                    </span>
                                  </div>
                                )
                                : (
                                  <div>
                                    <span
                                      className={classes.detailContainerHeader}
                                      id={`program_detail_left_section_title_${index + 1}`}
                                    >
                                      {attribute.label}
                                    </span>
                                    <div>
                                      <span className={classes.content} id={`program_detail_left_section_description_${index + 1}`}>
                                        {' '}
                                        {programData[attribute.dataField]}
                                        {' '}
                                      </span>
                                    </div>
                                  </div>
                                )
  }
                      </div>
                    </Grid>
                  ))}

                </Grid>
              </Grid>

              <Grid
                item
                lg={6}
                sm={6}
                xs={12}
              >
                <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>
                {updatedAttributesData.slice(0, 6).map((attribute, index) => (
                  <Grid item xs={12}>
                    <div>
                      {
                      attribute.internalLink
                        ? (
                          <div>
                            <span className={classes.detailContainerHeader}>{attribute.label}</span>
                            <div>
                              <span className={classes.content}>
                                {' '}
                                <Link
                                  className={classes.link}
                                  to={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                >
                                  {programData[attribute.dataField]}
                                </Link>
                                {' '}
                              </span>
                            </div>
                          </div>
                        )
                        : attribute.externalLink
                          ? (
                            <div>
                              <span
                                className={classes.detailContainerHeader}
                              >
                                {attribute.label}
                              </span>
                              <div>
                                <span className={classes.content}>
                                  {' '}
                                  <a
                                    href={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.link}
                                  >
                                    {programData[attribute.dataField]}
                                  </a>
                                  <img
                                    src={externalLinkIcon.src}
                                    alt={externalLinkIcon.alt}
                                    className={classes.externalLinkIcon}
                                  />
                                  {' '}
                                </span>
                              </div>
                            </div>
                          )
                          : attribute.internalLinkToLabel
                            ? (
                              <div>
                                <span
                                  className={classes.detailContainerHeaderLink}
                                >
                                  <a href={`${programData[attribute.dataField]}`} rel="noopener noreferrer">{attribute.label}</a>
                                </span>
                              </div>
                            )
                            : attribute.externalLinkToLabel
                              ? (
                                <div>
                                  <span
                                    className={classes.detailContainerHeaderLink}
                                  >
                                    <a href={`${programData[attribute.dataField]}`} target="_blank" rel="noopener noreferrer">{attribute.label}</a>
                                    <img
                                      src={externalLinkIcon.src}
                                      alt={externalLinkIcon.alt}
                                      className={classes.externalLinkIcon}
                                    />
                                  </span>
                                </div>
                              )
                              : (
                                <div>
                                  <span
                                    className={classes.detailContainerHeader}
                                    id={`program_detail_left_section_title_${index + 1}`}
                                  >
                                    {attribute.label}
                                  </span>
                                  <div>
                                    <span className={classes.content} id={`program_detail_left_section_description_${index + 1}`}>
                                      {' '}
                                      {programData[attribute.dataField]}
                                      {' '}
                                    </span>
                                  </div>
                                </div>
                              )
}
                    </div>
                  </Grid>
                ))}
                </Grid>
              </Grid>

            </Grid>
          </div>
        </div>
      </div>
      { table.display ? (
        <div id="table_program_detail" className={classes.tableContainer}>

          <div className={classes.tableDiv}>
            <div className={classes.tableTitle}>
              <span className={classes.tableHeader}>{table.title}</span>
            </div>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Typography>
                    <CustomDataTable
                      data={data.programDetail[table.dataField]} // data.programDetail[table.dataField]
                      columns={getColumns(table, classes, data, externalLinkIcon, '/explore', redirectToArm, '', globalData.replaceEmptyValueWith)}
                      options={getOptions(table, classes)}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : ''}
    </>
  );
};

const styles = (theme) => ({
  topTitle: {
    maxWidth: '1350px',
    margin: 'auto',
    marginTop: '8px',
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '16px',
  },
  parentPage: {
    color: '#003F74'
  },
  greaterSign: {
    padding: '0px 2px',
  },
  topStudyId: {
    color: '#646464',
  },
  topContainer: {
    background: '#FFFFFF',
    // border: '5px solid purple'
  },
  container: {
    margin: 'auto',
    maxWidth: '1350px',
    paddingTop: '74px',
    background: '#FFFFFF !important',
    border: '0px solid black',
  },
  header: {
    background: '#FFFFFF',
    borderBottom: '#073155 3px solid',
    // height: '128px',
    marginBottom: '9px',
    position: 'relative',
  },
  subHeader: {
    height: '51px',
    background: 'linear-gradient(270deg, #064667 20.89%, #56A6D0 81.63%)',
  },
  headerTitle: {
    maxWidth: '1350px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  headerMainTitle: {
    fontFamily: 'Poppins',
    letterSpacing: '-0.02em',
    color: '#FFFFFF',
    bottom: '13px',
    fontSize: '26px',
    fontWeight: 300,
    position: 'absolute',
    lineHeight: '27.7px',
    marginLeft: '0px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    top: '-20px',
    marginLeft: '10px',
    width: '100px',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  studyId: {
    fontWeight: 600,
  },
  firstColumn: {
    maxWidth: '45%',
  },
  secondColumn: {
    maxWidth: '30%',
  },
  thirdColumn: {
    maxWidth: '25%',
  },
  widgetTitle: {
    color: '#0296c9',
    textTransform: 'uppercase',
    fontFamily: 'Lato !important',
    fontWeight: '500 !important',
    fontSize: '17px !important',
    letterSpacing: '0.025em',
  },
  borderLeft: {
    borderLeft: '#81A6BA 1px solid',
    paddingLeft: '25px !important',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.text.link,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  content: {
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
    lineHeight: '14px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  headerSubTitleCate: {
    color: '#00B0BD',
    fontWeight: '300',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '15px',
    overflow: 'hidden',
    lineHeight: '24px',
    paddingLeft: '2px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '14px',

  },
  headerMSubTitle: {
    paddingTop: '3px',
  },
  breadCrumb: {
    color: '#00B0BD',
  },
  headerButton: {
    position: 'absolute',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    lineHeight: '16.8px',
    right: '115px',
    float: 'right',
    bottom: '13px',
    width: '200px',
    height: '21px',
    textAlign: 'center',

  },
  headerButtonLinkText: {
    color: '#87C9EC',
    fontWeight: '400',
    fontSize: '14px',
  },
  headerButtonColumn: {
    color: '#87C9EC',
  },
  headerButtonLinkNumber: {
    color: '#FFFFFF',
    borderBottom: 'solid #FFFFFF',
    fontWeight: 600,
    fontSize: '16px',
    paddingBottom: '2px',
    margin: '0 4px',
  },

  detailContainer: {
    maxWidth: '1350px',
    margin: '9px auto 13px auto',
    paddingLeft: '16px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '525px',
    // border: '1px solid green',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296C9',
  },
  detailContainerHeaderLink: {
    fontFamily: 'Raleway',
    fontSize: '14px',
    letterSpacing: '0.025em',
    color: '#0077E3',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding: ' 35px 0 63px 2px !important',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '4px 48px 12px 0px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '103.9%',
    margin: '0px -8px -5px 0px',
    // border: '1px solid red',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerRight: {
    padding: '5px 0 5px 36px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '500px',
    width: '105%',
    borderLeft: '1px solid #81A6BA',
    borderRight: '1px solid #81A6BA',
    marginLeft: '-26px',
    // border: '1px solid black',
  },

  tableContainer: {
    background: '#f3f3f3',
    paddingBottom: '121px',
    // border: '5px solid red',
  },
  tableHeader: {
    paddingLeft: '30px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '50px',
    paddingLeft: '0px',
    // border: '3px solid green',
  },

  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#c32c2e',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    borderRadius: '22px',
    padding: '0 22px',
    width: '150px',
    height: '35px',
    lineHeight: '14px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '7px',
    paddingLeft: '7px',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamily,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296c9',
    paddingBottom: '20px',
  },
  fileContainer: {
    paddingTop: '4px',
  },
  fileContent: {
    backgroundColor: '#F3F3F3',
    borderRadius: '50%',
    height: '162px',
    width: '162px',
    paddingLeft: '48px',
    marginLeft: '36%',
    marginTop: '25px',
  },
  fileIcon: {
    '& img': {
      width: '163%',
      padding: '21px 120px 0px 0px',
    },
  },
  fileCount: {
    lineHeight: '31.7px',
    fontSize: '30px',
    color: '#7A297D',
    fontWeight: '600',
    borderBottom: '#7A297D solid 5px',
    fontFamily: 'Oswald',
    width: 'max-content',
    padding: '15px 0px 12px 0px',
  },
  paddingTop32: {
    paddingTop: '36px !important',
  },
  marginTopN37: {
    marginTop: '15px',
  },
  tableCell1: {
    paddingLeft: '25px',
    width: '200px',
  },
  tableCell2: {
    width: '370px',
  },
  tableCell3: {
    width: '370px',
  },
  tableCell4: {
    width: '160px',
  },
  tableCell5: {
    width: '160px',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(StudyView);
