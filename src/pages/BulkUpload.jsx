import React, { useState, useRef } from "react";
import axios from "axios";
import { FaFileUpload, FaDownload, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BulkUpload = () => {
  const [fileName, setFileName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const fileInputRef = useRef(null);

  // 🔹 Handle CSV Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setCurrentPage(1); // ✅ reset page

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const rows = text.split("\n").map((row) => row.split(","));

      if (rows.length < 2) {
        toast.error("Invalid CSV file");
        return;
      }

      const headers = rows[0].map((h) => h.trim());

      const data = rows
        .slice(1)
        .filter((row) => row.some((cell) => cell.trim() !== ""))
        .map((row) => {
          let obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index]?.trim() || "";
          });
          return obj;
        });

      // ✅ CLEAN DATA
      const cleanedData = data.map((item) => ({
        fullName: item.fullName,
        phoneMobile: item.phoneMobile,
        email: item.email,
        permanentAddress: item.permanentAddress,
        twelfthSchool: item.twelfthSchool,
        subjectsTaken: item.subjectsTaken,
      }));

      setTableData(cleanedData);
    };

    reader.readAsText(file);
  };

  // 🔹 Download CSV Template
  const handleDownloadCSV = () => {
    const headers = [
      "fullName",
      "phoneMobile",
      "email",
      "permanentAddress",
      "twelfthSchool",
      "subjectsTaken",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + headers.join(",");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "bulk_students_template.csv";
    link.click();
  };

  // 🔹 Upload to backend
  const handleUploadToServer = async () => {
    if (tableData.length === 0) {
      toast.error("No data to upload");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://servocci-backend-dip7.onrender.com/api/employee/bulk-upload",
        { students: tableData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Uploaded successfully");
      handleReset();

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset
  const handleReset = () => {
    setFileName("");
    setTableData([]);
    setCurrentPage(1);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ✅ Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className="p-6">
      <ToastContainer />

      <h2 className="text-3xl font-bold text-[#001b48] mb-6">
        📂 Bulk Upload Students
      </h2>

      {/* 🔥 ACTION BAR */}
      <div className="flex flex-wrap gap-4 mb-6">

        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          <FaDownload />
          Download CSV Template
        </button>

        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow cursor-pointer hover:bg-blue-700">
          <FaFileUpload />
          Upload CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </label>

        {fileName && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            <FaTrash />
            Clear
          </button>
        )}
      </div>

      {/* 📄 FILE NAME */}
      {fileName && (
        <p className="mb-4 text-sm text-gray-600">
          Selected File: <strong>{fileName}</strong>
        </p>
      )}

      {/* 📊 TABLE */}
      {tableData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-3">

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-[#001b48] text-white">
                <tr>
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">12th School</th>
                  <th className="px-4 py-2 border">Subjects</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{row.fullName}</td>
                    <td className="px-4 py-2 border">{row.phoneMobile}</td>
                    <td className="px-4 py-2 border">{row.email}</td>
                    <td className="px-4 py-2 border">{row.permanentAddress}</td>
                    <td className="px-4 py-2 border">{row.twelfthSchool}</td>
                    <td className="px-4 py-2 border">{row.subjectsTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📄 Row Info */}
          <div className="mt-3 text-sm text-gray-500 flex justify-between items-center">
            <span>
              Showing {indexOfFirstRow + 1} -{" "}
              {Math.min(indexOfLastRow, tableData.length)} of {tableData.length}
            </span>

            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* 🔄 Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>

            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#2c6975] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </div>
      )}

      {/* 🚀 Upload Button */}
      {tableData.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={handleUploadToServer}
            disabled={loading}
            className="bg-[#ff9d3d] text-white px-6 py-2 rounded shadow hover:bg-[#ff7700] disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload to Server"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;