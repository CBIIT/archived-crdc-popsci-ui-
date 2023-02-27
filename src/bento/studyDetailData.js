import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Study Code',
  dataField: 'program_acronym',
};

const pageSubTitle = {
  dataField: 'program_id',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Subjects in this Study',
  dataField: 'num_subjects',
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
      dataField: 'program_acronym',
      label: 'Study ID',
    },
    {
      dataField: 'program_name',
      label: 'Study Name',
    },
    {
      dataField: 'program_full_description',
      label: 'Description',
    },
  ],
};

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  attributes: [
    {
      dataField: 'program_acronym',
      label: 'Study Type',
    },
    {
      dataField: 'program_name',
      label: 'Actual Study Start Date',
    },
    {
      dataField: 'program_name',
      label: 'Actual Primary Completion Date',
    },
    {
      dataField: 'program_full_description',
      label: 'Organization',
    },
  ],
  widget: [
    {
      dataField: 'diagnoses',
      label: 'Diagnosis',
      display: true,
    },
  ],
  files: [
    {
      dataField: 'num_files',
      label: 'Number of files',
      fileIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programNumberofFilesIcon.svg',
      fileIconAlt: 'Number of files icon',
      display: true,
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
  dataField: 'studies',
  // Value must be one of the 'field' in columns
  defaultSortField: 'study_acronym',
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
      dataField: 'study_acronym',
      header: 'File Name',
      link: '/arm/{study_acronym}',
    },
    {
      dataField: 'study_name',
      header: 'File Type',
    },
    {
      dataField: 'study_full_description',
      header: 'Description',
    },
    {
      dataField: 'study_type',
      header: 'Format',
    },
    {
      dataField: 'num_subjects',
      header: 'Size',
    },
  ],
};

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query programDetail($program_id: String!) {
  programDetail(program_id: $program_id) {
    program_acronym
    program_id
    program_name
    program_full_description
    institution_name
    program_external_url
    num_subjects
    num_files
    num_samples
    num_lab_procedures
    disease_subtypes
    diagnoses {
      group
      subjects
    }
    studies { 
      study_name
      study_type
      study_acronym
      study_info
      study_full_description
      num_subjects
    }
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
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
};
