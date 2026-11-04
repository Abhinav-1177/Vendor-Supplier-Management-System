// Downloads rows as a CSV file in the browser.
// columns: [{ header: 'Order ID', value: (row) => row.id }]
export function exportCsv(filename, columns, rows) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [
    columns.map((c) => esc(c.header)).join(','),
    ...rows.map((r) => columns.map((c) => esc(c.value(r))).join(',')),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}