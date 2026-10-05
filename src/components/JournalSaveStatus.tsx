/** Routine feedback shares the existing navigation footer; detailed failures
 * remain in the notice overlay and the full message is always announced. */
export function JournalSaveStatus({className, message}: {className:string; message:string}) {
  const label = message === 'Progress saved on this device' ? 'Saved' : message;
  return <div className={`journal-footer-save ${className}`} role="status" title={message}>
    <span className="journal-save-label" aria-hidden="true" data-label={label}/>
    <span className="journal-save-announcement">{message}</span>
  </div>;
}
