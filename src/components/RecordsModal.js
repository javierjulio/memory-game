import { BaseModal } from 'react-spring-modal';
import RecordsTable from './RecordsTable';

function RecordsModal(props) {
  return(
    <BaseModal
      {...props}
      overlayProps={{ className: "ModalOverlay" }}
      overlayTransition={{
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      }}
      contentProps={{ className: "BottomModal" }}
      contentTransition={{
        from: { transform: 'translateY(102%)' },
        enter: { transform: 'translateY(0)' },
        leave: { transform: 'translateY(102%)' },
      }}
    >
      <div className="modal-header">
        <button className="button modal-close-button" onClick={props.onDismiss}>
          Close
        </button>
      </div>
      <div className="records-list">
        <p className="text-muted">Your objective is to solve puzzles in the fewest moves possible.</p>
        <RecordsTable />
      </div>
    </BaseModal>
  )
}

export default RecordsModal;
