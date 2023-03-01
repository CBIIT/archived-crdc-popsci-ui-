import gql from 'graphql-tag';

export const searchEnabled = true;

export const filterTabTitleText = 'Filter';
export const searchTabTitleText = 'Search';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
// NOTE: datafield is an field that is passed to query Basically name of section in terms of query. 
export const facetSearchData = [
  {
    label: 'Study', field: 'group', api: 'caseCountByStudy', apiForFiltering: 'filterCaseCountByStudy', datafield: 'studies', section: 'Cases', show: true,
  },
  {
    label: 'Study Type', field: 'group', api: 'filterCaseCountByStudyType', apiForFiltering: 'filterCaseCountByStudyType', datafield: 'study_types', section: 'Cases', show: true,
  },
  {
    label: 'Enrollment Year', field: 'group', api: 'filterCaseCountByEnrollmentYear', apiForFiltering: 'filterCaseCountByEnrollmentYear', datafield: 'enrollment_years', section: 'Cases', show: true, slider: true, quantifier: 'Years',
  },
  {
    label: 'Age at Enrollment', field: 'group', api: 'filterCaseCountByEnrollmentAge', apiForFiltering: 'filterCaseCountByEnrollmentAge', datafield: 'enrollment_ages', section: 'Cases', show: true, slider: true, quantifier: 'Years',
  },
  {
    label: 'Sex', field: 'group', api: 'caseCountBySex', apiForFiltering: 'filterCaseCountBySex', datafield: 'sexes', section: 'Cases', show: true,
  },
  {
    label: 'Race', field: 'group', api: 'caseCountByRace', apiForFiltering: 'filterCaseCountByRace', datafield: 'races', section: 'Cases', show: true,
  },
  {
    label: 'Ethnicity', field: 'group', api: 'caseCountByEthnicity', apiForFiltering: 'filterCaseCountByEthnicity', datafield: 'ethnicities', section: 'Cases', show: true,
  },
  {
    label: 'Diagnosed Cancer Type', field: 'group', api: 'filterCaseCountByDiagnosedCancerType', apiForFiltering: 'filterCaseCountByDiagnosedCancerType', datafield: 'dx_cancer_types', section: 'Cases', show: true,
  },
  {
    label: 'Age At Diagnosis', field: 'group', api: 'filterCaseCountByDiagnosedAge', apiForFiltering: 'filterCaseCountByDiagnosedAge', datafield: 'dx_ages', section: 'Cases', show: true, slider: true, quantifier: 'Years',
  },
  {
    label: 'Biospecimens Available', field: 'group', api: 'filterCaseCountByBiospecimensAvailable', apiForFiltering: 'filterCaseCountByBiospecimensAvailable', datafield: 'biospecimens_available', section: 'Cases', show: true,
  },
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  Cases: {
    color: '#6D5F5B',
    backgroundColor: '#E8D7C1', // CASE IDS
    checkBoxColorsOne: '#FFE8CB',
    checkBoxColorsTwo: '#FFE8CB',
    height: '5px',
    isExpanded: true,
  },
  Samples: {
    color: '#10BEFF',
    backgroundColor: '#C3EAF5',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: true,
  },
  Files: {
    color: '#E636E4',
    backgroundColor: '#F5C3F1',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: true,
  },
};

// --------------- Dashboard Facet Local Find Configuration --------------

export const facetSectionFindApi = {
  Cases: {
    api: 'subjectIds',
  },
  Samples: {
    api: 'sampleIds',
  },
  Files: {
    api: 'fileIds',
  },
};

export const search = {
  fileIds: {
    color: '#E636E4',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: false,
  },
  subjectIds: {
    color: '#10A075',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: false,
  },
  sampleIds: {
    color: '#10BEFF',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: false,
  },
  fileNames: {
    color: '#E636E4',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: false,
  },
};

// --------------- Default Dashboard Sidebar Sections styling --------------
export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

export const defaultSearch = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

// --------------- Dashboard ActiveFiltersQuery configuration --------------
export const displayActiveFiltersQuery = true;

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [
  // {
  //   type: 'sunburst',
  //   label: 'Study',
  //   dataName: 'armsByPrograms',
  //   datatable_level1_field: 'program',
  //   datatable_level2_field: 'arm',
  //   titleText: 'Cases',
  //   show: true,
  // },
  {
    type: 'donut',
    label: 'Study',
    dataName: 'caseCountByStudy', // subjectCountByDiagnoses
    // datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Enrollment Year',
    dataName: 'caseCountByEnrollmentYear', // subjectCountByDiagnoses
    // datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Age-Range at Enrollment',
    dataName: 'caseCountByEnrollmentYear', // subjectCountByDiagnoses
    // datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Sex',
    dataName: 'caseCountBySex', // subjectCountByDiagnoses
    // datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Race',
    dataName: 'caseCountByRace', // subjectCountByDiagnoses
    // datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Ethnicity',
    dataName: 'caseCountByEthnicity', // subjectCountByDiagnoses
    // datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
];
// TODO:- Remove once widget work
export const widgetsDataOrginal = [
  {
    type: 'sunburst',
    label: 'Programs and Arms',
    dataName: 'armsByPrograms',
    datatable_level1_field: 'program',
    datatable_level2_field: 'arm',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Diagnosis',
    dataName: 'subjectCountByDiagnoses',
    datatable_field: 'diagnosis',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Recurrence Score',
    dataName: 'subjectCountByRecurrenceScore',
    datatable_field: 'recurrence_score',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Tumor Size',
    dataName: 'subjectCountByTumorSize',
    datatable_field: 'tumor_size',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Chemotherapy',
    dataName: 'subjectCountByChemotherapyRegimen',
    datatable_field: 'chemotherapy',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Endocrine Therapy',
    dataName: 'subjectCountByEndocrineTherapy',
    datatable_field: 'endocrine_therapy',
    titleText: 'Cases',
    show: true,
  },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = { // TODO:- Replace Icon
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};
export const resetIconFilter = { // TODO:- Replace Icon
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

// NOTE: dashboardTable configration is depricated and no longer used. Remove if not used. 
// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    // A maximum of 10 columns (tableData) are allowed
    {
      dataField: 'case_ids',
      header: 'Case ID',
      sort: 'asc',
      link: '/case/{case_ids}',
      primary: true,
      display: true,
    },
    {
      dataField: 'program',
      header: 'Program Code',
      sort: 'asc',
      link: '/program/{program_id}',
      display: true,
    },
    {
      dataField: 'program_id',
      header: 'Program ID',
      sort: 'asc',
      display: false,
    },
    {
      dataField: 'study_acronym',
      header: 'Arm',
      sort: 'asc',
      link: '/arm/{study_acronym}',
      display: true,
    },
    {
      dataField: 'diagnosis',
      header: 'Diagnosis',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'recurrence_score',
      header: 'Recurrence Score',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'tumor_size',
      header: 'Tumor Size (cm)',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'er_status',
      header: 'ER Status',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'pr_status',
      header: 'PR Status',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'age_at_index',
      header: 'Age (years)',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'survival_time',
      header: 'Survival (days)',
      sort: 'asc',
      display: true,
    },
  ],
};

// --------------- Sorting related labels configuration --------------
export const sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections',
};

export const showCheckboxCount = 5;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  subjectCountByProgram{
        group
        subjects
      }
    subjectCountByStudy{
        group
        subjects
      }
    subjectCountByDiagnoses{
        group
        subjects
      }
    subjectCountByRecurrenceScore{
        group
        subjects
      }
    subjectCountByTumorSize{
        group
        subjects
      }
    subjectCountByChemotherapyRegimen{
        group
        subjects
      }
    subjectCountByTumorGrade{
        group
        subjects
      }
  subjectCountByErStatus{
        group
        subjects
      }
  subjectCountByPrStatus{
        group
        subjects
      }
  subjectCountByMenopauseStatus{
        group
        subjects
      }
  subjectCountByChemotherapyRegimen{
        group
        subjects
      }
      subjectCountByEndocrineTherapy{
    group
    subjects
  }
  subjectCountByFileType{
    group
    subjects
}
subjectCountByFileAssociation {
    group
    subjects
}
subjectCountByTissueComposition{
    group
    subjects
}
filterSubjectCountByAge{
  lowerBound
  upperBound
  subjects
}
subjectCountByTissueType{
    group
    subjects
}
    armsByPrograms {
        program
        caseSize
        children {
            arm
            caseSize
            size
        }
    }
    subjectOverViewPaged(first: 100) {
      subject_id
      program_id
      study_info
      samples
      program
      study_acronym
      diagnosis
      recurrence_score
      tumor_size
      tumor_grade
      er_status
      pr_status
      chemotherapy
      endocrine_therapy
      menopause_status
      age_at_index
      survival_time
      lab_procedures
      files{
        file_id
      }
  }
  }`;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_TABLE_DATA_QUERY = gql`{
  subjectOverViewPaged(first: 1000000) {
      subject_id
      program_id
      study_info
      samples
      program
      study_acronym
      diagnosis
      recurrence_score
      tumor_size
      tumor_grade
      er_status
      pr_status
      chemotherapy
      endocrine_therapy
      menopause_status
      age_at_index
      survival_time
      lab_procedures
      files{
        file_id
      }
  }
  }`;
