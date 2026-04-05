// import { ChangeBtn } from "../components/ChangeBtn.jsx"
// import { PageButton } from "../components/pageButton.jsx"
import styles from "../pagination.module.css"


export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const isFristPage = currentPage === 1;
    const isLastPage = currentPage === pages.length;

    const handlePrevClick = (event) => {
        event.preventDefault()
        if (!isFristPage) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextClick = (event) => {
        event.preventDefault()
        if (!isLastPage) {
            onPageChange(currentPage + 1)
        }
    }

    const handleChangePage = (event, page) => {
        event.preventDefault()
        console.log(currentPage, page)
        if (page !== currentPage) {
            onPageChange(page)
        }
    }

    const buildPageUrl = (page) =>{
        const url  = new URL(window.location)
        url.searchParams.set('page', page)
        return `${url.pathname}?${url.searchParams.toString()}`
    }

    return (
        <div className="flex justify-center mt-8">
            <nav className={styles.pagination}>
                <a href={buildPageUrl(currentPage-1)} className={styles.changeBtn} disabled={isFristPage} onClick={handlePrevClick}><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6L9 12L15 18M15 12H15.01" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg></a>
                <div className="flex flex-row gap-2">

                    {pages.map((page) => (
                        <a href={buildPageUrl(page)}className={currentPage === page ? `${styles.isActive} ${styles.pageBtn}` : `${styles.pageBtn}`} key={page} num={page} onClick={(event) => handleChangePage(event, page)}>{page}</a>))}

                </div>
                <a href={buildPageUrl(currentPage+1)} className={styles.changeBtn} disabled={isLastPage} onClick={handleNextClick}><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18M9 12H9.01" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg></a>
            </nav>
        </div>
    )
}