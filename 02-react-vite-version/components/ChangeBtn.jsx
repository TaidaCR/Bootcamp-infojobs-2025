export function ChangeBtn({id, img, disabled, onClick}) {
    return (
        <button id={id} disabled={disabled} onClick={onClick}
            className="change-btn">
            <span className="material-symbols-outlined text-lg">{img}</span>
        </button>
    )
}