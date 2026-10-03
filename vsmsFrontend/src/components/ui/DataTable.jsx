// columns: [{ key, header, render?: (row) => node, align? }]
export default function DataTable({ columns, rows, rowKey = 'id', empty = 'Nothing to show yet.' }) {
  return (
    <div className="table-scroll">
      <table className="table-modern">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="table-empty">{empty}</td></tr>
          )}
          {rows.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align }}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}