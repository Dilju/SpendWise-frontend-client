import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable"
import autoTable from "jspdf-autotable";


export const ReportExportBtn = ({ expenses }) => {
    
    // function for export t excel
    const exportToExcel = () => {
        const exportData = expenses.map(exp => ({
            Date: exp.date 
                ? new Date(exp.date).toLocaleDateString("en-IN") 
                : new Date(exp.createdAt).toLocaleDateString("en-IN"),
            Category: exp.category,
            Amount: Number(exp.amount),
            Notes: exp.notes || "-"
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
        XLSX.writeFile(workbook, "expenses_report.xlsx");
    };


    // function for export to pdf
    const exportToPdf = () => {
        const doc = new jsPDF();
        doc.text("Expenses Report", 14, 15);

        const tableColumn = ["Date", "Category", "Amount", "Notes"];
        const tableRows = expenses.map((exp) => {
            const formattedDate = exp.date
                ? new Date(exp.date).toLocaleDateString("en-IN")
                : new Date(exp.createdAt).toLocaleDateString("en-IN");

             const formattedAmount = `Rs. ${Number(exp.amount).toLocaleString("en-IN")}`;
        return [formattedDate, exp.category, formattedAmount, exp.notes || "-"];
        });

        // ✅ now autoTable will exist
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 25,
        });

        doc.save("expenses_report.pdf");
    };


    return(
        <div className="flex gap-4 mt-4">
            <button 
            className="border-2 border-green-600 px-4 py-2 rounded-lg text-green-700 font-bold
            hover:bg-green-700 hover:text-white transition" onClick={exportToExcel}
            >Export to Excel</button>
            <button className="border-2 border-red-500 px-4 py-2 rounded-lg text-red-600 font-bold
            hover:bg-red-600 hover:text-white transition" onClick={exportToPdf}
            >Export to PDF</button>
        </div>
    )
}