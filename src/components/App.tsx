import * as React from "react"
import { Container, Provider, Subscribe } from "unstated"

interface VisOptions {
  someVisOption: boolean
}

class VisOptionsState extends Container<VisOptions> {
  public state = { someVisOption: false }

  public handleUpdateSomeVisOption = (someVisOption: boolean) => {
    this.setState({ someVisOption })
  }
}

const SomeVisOptionSettings = ({ someVisOption, onUpdateSomeVisOption }) => {
  const onClick = () => onUpdateSomeVisOption(!someVisOption)

  return (
    <div>
      <code>someVisOption</code> is set to: {someVisOption ? "true" : "false"}
      <button onClick={onClick}>Update</button>
    </div>
  )
}

const ConnectedSomeVisOptionSettings = () => {
  return (
    <Subscribe to={[VisOptionsState]}>
      {(visOptions: VisOptionsState) => (
        <SomeVisOptionSettings
          someVisOption={visOptions.state.someVisOption}
          onUpdateSomeVisOption={visOptions.handleUpdateSomeVisOption}
        />
      )}
    </Subscribe>
  )
}

const DataExplorer = () => {
  const deVisOptionsState = new VisOptionsState()

  return (
    <Provider inject={[deVisOptionsState]}>
      <div className="data-explorer">
        <ConnectedSomeVisOptionSettings />
      </div>
    </Provider>
  )
}

const CellEditorOverlay = () => {
  const ceoVisOptionsState = new VisOptionsState()

  return (
    <Provider inject={[ceoVisOptionsState]}>
      <div className="cell-editor-overlay">
        <ConnectedSomeVisOptionSettings />
      </div>
    </Provider>
  )
}

const App = () => {
  return (
    <>
      <DataExplorer />
      <CellEditorOverlay />
    </>
  )
}

export default App
