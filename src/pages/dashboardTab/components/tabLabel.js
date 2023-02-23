import React from 'react';
import { withStyles } from '@material-ui/core';

const tabLabel = ({
  classes, title, count, primaryColor,
}) => (
  <div className={classes.defaultStyle}>
    <span style={{ color: primaryColor }}>
      {title}
      {' '}

    </span>
    <span style={{ color: primaryColor, fontWeight: 300, fontSize: '16px', }}>
      (
      {count}
      )
    </span>

  </div>
);

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Poppins',
    textTransform: 'capitalize',
    fontSize: '18.5px',
  },
});

export default withStyles(styles, { withTheme: true })(tabLabel);
