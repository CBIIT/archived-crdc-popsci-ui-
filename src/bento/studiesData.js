import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/svgs/studiesIcon.svg',
  alt: 'PopSci Study logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Studies',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'studyInfo',
  // Value must be one of the 'field' in columns
  defaultSortField: 'study_code',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'study_code',
      header: 'Study Code',
      link: '/study/{study_code}',
      display: true,
    },
    {
      dataField: 'program',
      header: 'Program',
    },
    {
      dataField: 'study_name',
      header: 'Study Name',
    },
    {
      dataField: 'study_type',
      header: 'Start Type',
    },
    {
      dataField: 'study_id',
      header: 'Study ID',
    },
    {
      dataField: 'cases',
      header: 'Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve study info --------------
const GET_STUDIES_DATA_QUERY = gql`{
  studyInfo {
    cases
    program
    study_code
    study_id
    study_name
    study_type
  }
}
 `;

export {
  programListingIcon,
  externalLinkIcon,
  table,
  GET_STUDIES_DATA_QUERY,
};
