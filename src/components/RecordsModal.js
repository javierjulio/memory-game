import { BottomModal } from 'react-spring-modal';
import RecordsTable from './RecordsTable';

function RecordsModal(props) {
  return(
    <BottomModal {...props}>
      <div className="modal-header">
        <button className="button modal-close-button" onClick={props.onRequestClose}>
          Close
        </button>
      </div>
      <div className="records-list">
        <p className="text-muted">Your objective is to solve puzzles in the fewest moves possible.</p>
        <RecordsTable />
      </div>
    </BottomModal>
  )
}

export default RecordsModal;
