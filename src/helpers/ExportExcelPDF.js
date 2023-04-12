import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import {Stack } from '@mui/material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Tooltip from '@mui/material/Tooltip';


const ExportExcelPDF = (props)  => {
  //parametrizar para que la exportacion sea para varias  cosas distintas

  const handlerExportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(props.lista);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, props.titulo);
    //Buffer
    //let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, props.titulo+".xlsx");
  };
  const handlerExportPDF = () => {
    const doc = new jsPDF("landscape", "pt", "a2");
    doc.text(props.titulo, 20, 20);
    doc.autoTable({
      theme: "grid",
      startY: 25,
      tableWidth: "auto",
      columnWidth: "auto",
      styles: { overflow: "", cellWidth: "wrap" },
      // Override the default above for the text column
      columnStyles: { text: { cellWidth: "wrap" } },

      //hay que elegir bien las columnas porque se sale de la pagina
      columns: props.columns,

      body: props.lista,
    });
    doc.save(props.titulo+".pdf");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Box
        onClick={handlerExportExcel}
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: 1,
          color: "text.secondary",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Tooltip title="Exportar a excel">
          <Fab color="secondary" aria-label="excel">
            <img
              src="https://img.icons8.com/material/24/FFFFFF/export-excel.png"
              alt="Exportar a excel"
            />
          </Fab>
        </Tooltip>
      </Box>
      <Box
        onClick={handlerExportPDF}
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: 1,
          color: "text.secondary",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Tooltip title="Exportar a PDF">
          <Fab color="secondary" aria-label="pdf">
            <img
              src="https://img.icons8.com/material/24/FFFFFF/export-pdf.png"
              alt="Exportar a PDF"
            />
          </Fab>
        </Tooltip>
      </Box>
    </Stack>
  );
}

export default ExportExcelPDF;