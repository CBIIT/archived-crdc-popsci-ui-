import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { resetIcon } from '../../../bento/dashboardData';

if (resetIcon.src === '') {
  resetIcon.src = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg';
}

const clearFilters = ({
  classes, onClick, disable, resetText,
}) => (
  <div className={classes.floatRight}>
    <Button
      id="button_sidebar_clear_all_filters"
      variant="outlined"
      disabled={disable}
      className={classes.customButton}
      classes={{ root: classes.clearAllButtonRoot }}
      disableRipple
      onClick={() => onClick()}
    >
      <img
        src={resetIcon.src}
        height={resetIcon.size}
        width={resetIcon.size}
        alt={resetIcon.alt}
      />
    </Button>
    <span className={disable ? classes.resetTextDisabled : classes.resetText}>{resetText}</span>
  </div>
);

const styles = (theme) => ({
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '12px',
    maxWidth: '40px',
    maxHeight: '30px',
    minWidth: '40px',
    minHeight: '30px',
    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
    border: '1px solid #C7B7A2'
  },
  floatRight: {
    margin: '17px 0px 13px 10px',
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#6D5F5B',
    fontSize: 14,
  },
  resetTextDisabled: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#a9b2b9',
    fontSize: 14,
  },
});

export default withStyles(styles, { withTheme: true })(clearFilters);
