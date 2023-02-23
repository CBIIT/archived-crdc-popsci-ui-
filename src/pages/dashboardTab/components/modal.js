import React, { useRef } from 'react';
import {
  withStyles,
} from '@material-ui/core';
import {
  fetchAllFileIDsForSelectAll, getCountForAddAllFilesModal, getFilesCount, clearTableSelections,
} from '../store/dashboardReducer';
import Dialog from '../../../components/AddToCartDialog';
import { addToCart, cartWillFull, getFilesIdsInCart } from '../../fileCentricCart/store/cart';

const styles = () => ({
  button: {
    borderRadius: '30px',
    width: '197px',
    height: '36px',
    lineHeight: '30px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Raleway',
    color: '#fff',
    backgroundColor: '#6E888B',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '24px',
    border: 'none',
    fontWeight: 700,
  },
});

const SelectAllModalDialog = ({
  classes, openSnack,
}) => {
  const childRef = useRef();

  const handleClickOpen = () => {
    childRef.current.open();
  };

  const handleClose = () => {
    childRef.current.close();
  };

  async function exportFiles() {
    // Find the newly added files by comparing
    const getAllFilesData = await fetchAllFileIDsForSelectAll(getFilesCount());
    const currentFileIdsInCart = getFilesIdsInCart();

    const newFileIDSLength = (currentFileIdsInCart !== null || currentFileIdsInCart !== [])
      ? getAllFilesData.filter(
        (e) => !currentFileIdsInCart.find((a) => e === a),
      ).length : getAllFilesData.length;
    openSnack(newFileIDSLength || 0);
    addToCart({ fileIds: getAllFilesData });
    // tell the reducer to clear the selection on the table.
    clearTableSelections();
    // tell the reducer to clear the selection on the table.
    handleClose();
  }

  const numberOfRowsSelected = getCountForAddAllFilesModal();
  const numberOfFilesSelected = getFilesCount();

  const OnYesClick = () => { exportFiles(); };
  const onNoClick = () => { handleClose(); };

  return (
    <>
      <button type="button" onClick={handleClickOpen} className={classes.button}>
        Add All Filtered Files
      </button>
      <Dialog
        ref={childRef}
        onYesClick={OnYesClick}
        onNoClick={onNoClick}
        numberOfRowsSelected={numberOfRowsSelected}
        cartWillFull={cartWillFull(numberOfFilesSelected)}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(SelectAllModalDialog);
