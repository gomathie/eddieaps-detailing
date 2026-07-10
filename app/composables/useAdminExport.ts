export type ExportColumn = { label: string, value: (row: any) => unknown }

const cell = (v: unknown) => (v === null || v === undefined ? '' : String(v))

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function buildTable(rows: any[], columns: ExportColumn[]) {
  const head = columns.map(c => `<th>${cell(c.label)}</th>`).join('')
  const body = rows
    .map(r => `<tr>${columns.map(c => `<td>${cell(c.value(r))}</td>`).join('')}</tr>`)
    .join('')
  return `<table border="1" cellspacing="0"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`
}

export function useAdminExport() {
  const exportCsv = (rows: any[], columns: ExportColumn[], filename: string) => {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`
    const header = columns.map(c => esc(cell(c.label))).join(',')
    const lines = rows.map(r => columns.map(c => esc(cell(c.value(r)))).join(','))
    download([header, ...lines].join('\r\n'), `${filename}.csv`, 'text/csv;charset=utf-8;')
  }

  const exportExcel = (rows: any[], columns: ExportColumn[], filename: string) => {
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body>${buildTable(rows, columns)}</body></html>`
    download(html, `${filename}.xls`, 'application/vnd.ms-excel')
  }

  const exportPdf = (title: string, rows: any[], columns: ExportColumn[]) => {
    const doc = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:24px;color:#111}h1{font-size:18px;margin:0 0 4px}p.meta{color:#666;font-size:12px;margin:0 0 16px}table{border-collapse:collapse;width:100%;font-size:11px}th,td{border:1px solid #ccc;padding:6px 8px;text-align:left;vertical-align:top}th{background:#1e40af;color:#fff}tr:nth-child(even) td{background:#f3f4f6}</style></head><body><h1>${title}</h1><p class="meta">Generated ${new Date().toLocaleString()} — ${rows.length} record(s)</p>${buildTable(rows, columns)}<script>window.onload=function(){window.print()}</script></body></html>`
    const w = window.open('', '_blank')
    if (w) {
      w.document.write(doc)
      w.document.close()
    }
  }

  return { exportCsv, exportExcel, exportPdf }
}
