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
  dataField: 'programInfo',
  // Value must be one of the 'field' in columns
  defaultSortField: 'program_acronym',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'program_acronym',
      header: 'Study Code',
      link: '/study/{program_id}',
      display: true,
    },
    {
      dataField: 'pubmed_id',
      header: 'Program',
    },
    {
      dataField: 'program_name',
      header: 'Study Name',
    },
    {
      dataField: 'start_date',
      header: 'Start Type',
    },
    {
      dataField: 'program_id',
      header: 'Study ID',
    },
    {
      dataField: 'num_subjects',
      header: 'Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_PROGRAMS_DATA_QUERY = gql`{
  programInfo {
 program_acronym
 program_id
 program_name
 start_date
 end_date
 pubmed_id
 num_studies
 num_subjects
 }
}
 `;

export {
  programListingIcon,
  externalLinkIcon,
  table,
  GET_PROGRAMS_DATA_QUERY,
};
