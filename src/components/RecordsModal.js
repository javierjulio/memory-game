import { animated, useTransition } from 'react-spring';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import RecordsTable from './RecordsTable';

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

function RecordsModal({ isOpen, onClose, onDismiss }) {
  const transitions = useTransition(isOpen, null, {
    from: { overlayOpacity: 0, contentTransform: 'translateY(102%)' },
    enter: { overlayOpacity: 0.5, contentTransform: 'translateY(0%)' },
    leave: { overlayOpacity: 0, contentTransform: 'translateY(102%)' },
  });

  return(
    <>
      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <AnimatedDialogOverlay
              key={key}
              dangerouslyBypassFocusLock
              dangerouslyBypassScrollLock
              onDismiss={onDismiss}
              className="modal-overlay"
              style={{ "--opacity": props.overlayOpacity }}
            >
              <AnimatedDialogContent
                aria-labelledby="Records Table"
                className="modal"
                style={{ transform: props.contentTransform }}
              >
                <div className="modal-header">
                  <button className="button modal-close-button" onClick={onClose}>
                    Close
                  </button>
                </div>
                <div className="records-list">
                  <p className="text-muted">Your objective is to solve puzzles in the fewest moves possible.</p>
                  <RecordsTable />
                </div>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  )
}

export default RecordsModal;
