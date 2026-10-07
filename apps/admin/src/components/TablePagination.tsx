export default function TablePagination({ page, totalPages, onPage }: {
  page: number;
  totalPages: number;
  onPage: (value: number) => void;
}) {
  return <div className="pagination">
    <button disabled={page <= 1} onClick={() => onPage(page - 1)}>← <span>Previous</span></button>
    <div className="page-numbers">{Array.from({ length: totalPages }, (_, index) => index + 1).map((number) =>
      <button key={number} onClick={() => onPage(number)} className={page === number ? "page-current" : ""}>{number}</button>
    )}</div>
    <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}><span>Next</span> →</button>
  </div>;
}
