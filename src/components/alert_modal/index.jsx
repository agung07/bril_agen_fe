import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from 'reactstrap';

const AlertModal = (props) => {
  function onCancel() {
    if (props.onCancel) props.onCancel();
  }

  const { showConfirm = true } = props;

  return (
    <SweetAlert
      {...props}
      showConfirm={false}
      showCancel={false}
    >
      <div>
        <p>{props.message}</p>
        <div className="d-flex align-items-center justify-content-end">
          {props.showCancel &&
            <Button
              onClick={onCancel}
              color={'secondary'}
              className="mt-2"
            >
              {props.cancelBtnText || 'CANCEL'}
            </Button>
          }
          {showConfirm && (
            <Button
              onClick={props.onConfirm}
              color={'primary'}
              className="mt-2 ml-3"
            >
              {props.confirmBtnText || 'OK'}
            </Button>
          )}
        </div>
      </div>
    </SweetAlert>
  )
}

export default AlertModal;