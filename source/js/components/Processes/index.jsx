import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { Progress } from 'rebass'
import * as styles from './styles.css'

const Processes = (props) => {
  const headings = ['#', '', 'Progress']
  const tableData = props.processes.map((proc) => {
    const cputime = proc.cputime
    const done = cputime.done / cputime.required

    return ([
      proc.id,
      <div style={{width: '40px'}}>{cputime.done + '/' + cputime.required}</div>,
      <Progress style={{width: '300px'}} color='primary' value={done} />
    ])
  })

  return (
    <Flex>
      <Box w={1 / 6}>
        <h5>Active</h5>
        <h1>{props.processes.length}</h1>
      </Box>
      <Box w={1 / 3}>
        <h5>Resolved</h5>
        <h1>{props.numOfResolved}</h1>
      </Box>
      <Box w={1}>
        <Box className={styles.wrapper}>
          <table>
            <thead>
              <tr>
                 {headings.map((heading, i) => (
                   <th key={i}>{heading}</th>
                 ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {row.map((d, j) => (
                    <td key={j}>{d}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Flex>
  )
}

export default connect(
  (state) => {
    return {
      processes: state.processes.list.current,
      numOfResolved: state.processes.list.resolved.length
    }
  }
)(Processes)
