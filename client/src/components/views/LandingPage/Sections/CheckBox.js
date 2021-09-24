import React, { Fragment, useState } from 'react'
import { Collapse, Checkbox } from 'antd'
const { Panel } = Collapse
function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked]
        if (currentIndex === -1) newChecked.push(value)
        else newChecked.splice(currentIndex, 1)
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <Fragment key={index}>
            <Checkbox
                style={{ marginRight: '5px' }}
                onChange={() => handleToggle(value._id)}
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            <span style={{ marginRight: '15px' }}>{value.name}</span>
        </Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Continents" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
