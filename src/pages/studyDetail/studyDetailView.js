import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  CustomDataTable,
  manipulateLinks,
  getOptions,
  getColumns,
} from 'bento-components';
import globalData from '../../bento/siteWideConfig';
import {
  pageTitle, table, externalLinkIcon,
  studyDetailIcon, aggregateCount, leftPanel, rightPanel,
} from '../../bento/studyDetailData';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
} from '../dashboardTab/store/dashboardReducer';

const StudyView = ({ classes, data, theme }) => {
  const studyDetailData = data.studyDetail[0];

  const redirectTo = () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'studies',
      isChecked: true,
      name: studyDetailData.study_code,
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
    numberOfPrograms: studyDetailData.numberOfPrograms !== undefined ? studyDetailData.numberOfStudies : 'undefined',
    numberOfStudies: studyDetailData.numberOfStudies !== undefined ? studyDetailData.numberOfStudies : 'undefined',
    numberOfCases: studyDetailData.numberOfCases !== undefined ? studyDetailData.numberOfCases : 'undefined',
    numberOfFiles: studyDetailData.numberOfFiles !== undefined ? studyDetailData.numberOfFiles : 'undefined',
  };
  const leftUpdatedAttributesData = manipulateLinks(leftPanel.attributes);
  const rightUpdatedAttributesData = manipulateLinks(rightPanel.attributes);

  const displayStudyDetail = (updatedAttributesData, attribute, index) => {
    return (
      <div>
        {
        attribute.internalLink
          ? (
            <div>
              <span className={classes.detailContainerHeader}>{attribute.label}</span>
              <div className={classes.contentContainer}>
                <span className={classes.content}>
                  {' '}
                  <Link
                    className={classes.link}
                    to={`${attribute.actualLink}${studyDetailData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                  >
                    {studyDetailData[attribute.dataField]}
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
                <div className={classes.contentContainer}>
                  <span className={classes.content}>
                    {' '}
                    <a
                      href={`${attribute.actualLink}${studyDetailData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.link}
                    >
                      {studyDetailData[attribute.dataField]}
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
                    <a href={`${studyDetailData[attribute.dataField]}`} rel="noopener noreferrer">{attribute.label}</a>
                  </span>
                </div>
              )
              : attribute.externalLinkToLabel
                ? (
                  <div>
                    <span
                      className={classes.detailContainerHeaderLink}
                    >
                      <a href={`${studyDetailData[attribute.dataField]}`} target="_blank" rel="noopener noreferrer">{attribute.label}</a>
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
                    <div className={classes.contentContainer}>
                      <span className={classes.content} id={`program_detail_left_section_description_${index + 1}`}>
                        {' '}
                        {studyDetailData[attribute.dataField]}
                        {' '}
                      </span>
                    </div>
                  </div>
                )
        }
      </div>
    )
  }

  return (
    <>
      <StatsView data={stat} />
      {/* Study Detail: First Section */}
      <div className={classes.topContainer}>
        <div className={classes.topTitle}>
        <Link
          className={classes.studiesLink}
          to={'/studies'}
        >
          <span className={classes.parentPage}> Studies </span>
        </Link>  
          <span className={classes.greaterSign}> {' > '} </span>
          <span className={classes.topStudyId}> {studyDetailData[pageTitle.dataField]} </span>
        </div>
        <div className={classes.container}>

          {/* First Section: Header */}
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
                  {pageTitle.label}{': '}{' '} <span className={classes.studyId}>{' '}{studyDetailData[pageTitle.dataField]} </span>
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
      
                          {studyDetailData[aggregateCount.dataField]}
      
                        </span>
                      </Link>
                    </span>
                  </div>
                ) : ''}
              </div>
            </Grid>
          </Grid>
          {/* First Section: Study Detail */}
          <Grid container className={classes.detailContainer}>
            {/* First Section - Study Detail: LEFT */}
            <Grid item lg={6} sm={6} xs={12} container>
              <Grid container direction="row" className={classes.detailContainerLeft}>
                {leftUpdatedAttributesData.slice(0, 6).map((attribute, index) => (
                  <Grid item xs={12} className={classes.insideDetailContainerLeft}>
                    { displayStudyDetail(leftUpdatedAttributesData, attribute, index) }
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* First Section - Study Detail: RIGHT */}
            <Grid item lg={6} sm={6} xs={12}>
              <Grid container direction="row" className={classes.detailContainerRight}>
              {rightUpdatedAttributesData.slice(0, 6).map((attribute, index) => (
                <Grid item xs={12} className={classes.insideDetailContainerRight}>
                  { displayStudyDetail(rightUpdatedAttributesData, attribute, index) }
                </Grid>
              ))}
              </Grid>
            </Grid>

          </Grid>
        </div>
      </div>

      {/* Study Detail: Second Section */}
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
                      data={[]} // data.programDetail[table.dataField]
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
    paddingTop: '8px',
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    margin: 'auto',
    maxWidth: '1350px',
    paddingTop: '74px',
    background: '#FFFFFF !important',
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
  contentContainer: {
    marginTop: '7px',
  },
  content: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#000000',
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
    maxWidth: '350px',
    minWidth: 'fit-content',
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
    paddingLeft: '16px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '589px',
  },
  detailContainerHeader: {
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: '19px',
    lineHeight: '25px',
    letterSpacing: '-0.02em',
    color: '#24415C',
    textTransform: 'uppercase',
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
    padding: '22px 74px 0px 16px !important',
    display: 'block',
    minHeight: '567px',
    maxHeight: '567px',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRight: '1px solid #76C4E4',

    '&::-webkit-scrollbar': {    
      width: '7px',
      border: 'none',
    },
    '&::-webkit-scrollbar-track': {    
      background: 'white',
    },
    '&::-webkit-scrollbar-thumb': {    
      background: '#76C4E4',
    },
    '&::-webkit-scrollbar-track-piece': {
      background: 'white',
    }
  },
  insideDetailContainerLeft: {
    marginBottom: '33px',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerRight: {
    padding: '22px 48px 0px 53px !important',
    minHeight: '567px',
    maxHeight: '567px',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '567px',
    borderRight: '1px solid #76C4E4',

    '&::-webkit-scrollbar': {    
      width: '7px',
      border: 'none',
    },
    '&::-webkit-scrollbar-track': {    
      background: 'white',
    },
    '&::-webkit-scrollbar-thumb': {    
      background: '#76C4E4',
    },
    '&::-webkit-scrollbar-track-piece': {
      background: 'white',
    }
  },
  insideDetailContainerRight: {
    marginBottom: '33px',
  },
  tableContainer: {
    background: '#f3f3f3',
    paddingBottom: '121px',
    // border: '2px solid red',
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
    fontFamily: 'Open Sans',
    fontSize: '19px',
    lineHeight: '24.7px',
    letterSpacing: '-0.02em',
    color: '#24415C',
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
  studiesLink: {
    textDecoration: 'none',
  }
});

export default withStyles(styles, { withTheme: true })(StudyView);
