import { cilDelete } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormCheck } from '@coreui/react'
import React from 'react'

const SurveyAnswerItem = (props) => {
    return (
        <div className="mt-2 mb-2">
            <CFormCheck
                inline
                type={props.type}
                label={props.row}
                className="col-sm-11" />
            <CIcon
                className="col-sm-1"
                icon={cilDelete}
                size={'sm'}
                onClick={() => props.onDeleteRow(props.index)} />
        </div>
    )
}

export default SurveyAnswerItem