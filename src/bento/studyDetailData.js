import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Study Code',
  dataField: 'study_code',
};

const pageSubTitle = {
  dataField: 'study_code',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Subjects in this Study',
  dataField: 'cases',
  link: '/explore',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for studyDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px
const studyDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/svgs/studyDetailIcon.svg',
  alt: 'Population Science Study Detail logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const leftPanel = {
  attributes: [
    {
      dataField: 'study_id',
      label: 'Study ID',
    },
    {
      dataField: 'study_name',
      label: 'Study Name',
    },
    {
      dataField: 'description',
      label: 'Description',
    },
  ],
};

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  attributes: [
    {
      dataField: 'study_type',
      label: 'Study Type',
    },
    {
      dataField: 'actual_start_date',
      label: 'Actual Study Start Date',
    },
    {
      dataField: 'actual_completion_date',
      label: 'Actual Primary Completion Date',
    },
    {
      dataField: 'organization',
      label: 'Organization',
    },
  ],
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Associated Files',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'studyDetail',
  // Value must be one of the 'field' in columns
  defaultSortField: 'study_code',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  viewColumns: true,
  download: true,
  headerPagination: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
      // link: '/arm/{study_acronym}',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
    },
    {
      dataField: 'file_description',
      header: 'Description',
    },
    {
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
      header: 'Size',
    },
  ],
};

// --------------- GraphQL query - Retrieve study details --------------
const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query studyDetail($study_code: String){
    studyDetail(study_code: $study_code){
      study_code
      study_id
      study_name
      study_type
      description
      actual_start_date
      actual_completion_date
      organization
      cases
      files {
        file_name
        file_type
        file_description
        file_format
        file_size
      }
      numberOfPrograms
      numberOfStudies
      numberOfCases
      numberOfFiles
    }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  studyDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  GET_STUDY_DETAIL_DATA_QUERY,
  table,
};
