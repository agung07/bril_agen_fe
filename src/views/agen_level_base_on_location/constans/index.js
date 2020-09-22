export const initialState = {
    list: {},
    wilayah: [],
    filter: {
        wilayah: null,
        status: false,
    },
    alert: {
      show: false,
      message: '',
      error: false,
      success: false,
      showConfirm: false,
      onConfirm: () => {},
      confirmBtnText: 'OK',
      showCancel: false,
      onCancel: () => {},
      cancelBtnText: 'CANCEL',
    }
}