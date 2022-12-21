import React, { useEffect, useState } from 'react'
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'

import { setFees, setFinalizeFee } from './config'

const SettingModal = ({ visible, onClose, data }) => {
  const [inputFee, setInputFee] = useState(data.fee)
  const [inputFinalizeFee, setInputFinalizeFee] = useState(data.finalizeFee)

  const handleSave = async () => {
    if (inputFee !== data.fee) {
      const tx = await setFees(data.provider, data.account, data.factoryAddress, inputFee)
      console.log(tx)
    }
    if (data.index >= 4) {
      if (inputFinalizeFee !== data.finalizeFee) {
        const tx = await setFinalizeFee(
          data.provider,
          data.account,
          data.profitAddress,
          inputFinalizeFee,
        )
        console.log(tx)
      }
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Change Fee</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-3">
          <CFormLabel htmlFor="updateFee" className="col-sm-2 col-form-label">
            Fee:
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="number"
              id="updateFee"
              value={inputFee}
              placeholder="Input fee (BNB amount)"
              defaultValue={data.fee}
              onChange={(e) => {
                setInputFee(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        {data.index >= 4 ? (
          <CRow className="mb-3">
            <CFormLabel htmlFor="updateFinalizeFee" className="col-sm-2 col-form-label">
              Finalize Fee:
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="number"
                id="updateFinalizeFee"
                value={inputFinalizeFee}
                placeholder="Input finalize fee (% amount)"
                defaultValue={data.finalizeFee}
                onChange={(e) => {
                  setInputFinalizeFee(e.target.value)
                }}
              />
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default SettingModal
