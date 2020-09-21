import {validationList} from '../../../contants';

export const maxNoLisensi = 99999;
export const initialState = {
  fields: {
    no_lisensi: {
          name: 'no_lisensi',
          placeholder: 'No. Lisensi...',
          label: 'No. Lisensi',
          type: 'input',
          inputType: 'number',
          validation: [validationList.required],
          value: null,
          error: null,
          options: [],
          isDisable: false,
      },
      nama_agen: {
            name: 'nama_agen',
            placeholder: 'Nama Agen...',
            label: 'Nama Agen',
            type: 'input',
            inputType: 'text',
            validation: [validationList.required],
            value: null,
            error: null,
            options: [],
            isDisable: false,
        },
      id_agen_level: {
            name: 'id_agen_level',
            placeholder: 'Pilih Level Agen',
            label: 'Level Agen',
            type: 'select',
            inputType: '',
            validation: [validationList.required],
            value: null,
            error: null,
            options: [],
            isDisable: false,
        },
      wilayah_kerja: {
          name: 'wilayah_kerja',
          placeholder: '',
          label: 'Wilayah Kerja',
          type: 'select',
          inputType: '',
          validation: [validationList.required],
          value: null,
          error: null,
          options: [],
          isDisable: false,
      },
      status: {
          name: 'status',
          placeholder: '',
          label: 'Status',
          type: 'check_box',
          validation: [],
          value: null,
          error: null,
          inputType: '',
          isDisable: false,
      },
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

export const forms = [
  {
    name: 'no_lisensi',
    label: 'No. Lisensi',
    type: 'text',
    validations: [validationList.number, validationList.required],
  },
  {
    name: 'nama_agen',
    label: 'Nama Agen',
    type: 'text',
    validations: [validationList.required],
  },
  {
    name: 'level_agen',
    label: 'Level Agen',
    type: 'select',
    validations: [validationList.required],
  },
  {
    name: 'wilayah_kerja',
    label: 'Wilayah Kerja',
    type: 'text',
    validations: [validationList.required],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'check_box',
    validations: [],
  }
];