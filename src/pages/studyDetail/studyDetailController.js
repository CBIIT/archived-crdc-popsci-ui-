import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyView from './studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';

const ProgramDetailContainer = ({ match }) => {
  console.log("||: ", match)
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { study_code: match.params.id },
  });
  console.log("||: ", loading, error, data)

  if (loading) return <CircularProgress />;
  if (error || !data || data.studyDetail.study_code !== match.params.id) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return <StudyView data={data} />;
};

export default ProgramDetailContainer;
