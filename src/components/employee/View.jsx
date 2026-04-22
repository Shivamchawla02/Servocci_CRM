import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import html2pdf from 'html2pdf.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [universityEmail, setUniversityEmail] = useState('');

  // ================= FETCH EMPLOYEE =================
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `https://servocci-backend-dip7.onrender.com/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setEmployee(res.data.employee);
      } catch (err) {
        console.error('Error fetching employee:', err);
      }
    };

    fetchEmployee();
  }, [id]);

  // ================= RENDER PDF DOCUMENTS =================
  useEffect(() => {
    const renderPdfs = async () => {
      if (!employee?.documents) return;

      for (const [key, url] of Object.entries(employee.documents)) {
        if (url?.endsWith('.pdf')) {
          try {
            const wrapper = document.getElementById(`pdf-wrapper-${key}`);
            if (!wrapper) continue;

            wrapper.innerHTML = '';

            const loadingTask = pdfjsLib.getDocument({
              url,
              withCredentials: false,
            });

            const pdf = await loadingTask.promise;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const viewport = page.getViewport({ scale: 1.5 });

              const canvas = document.createElement('canvas');
              canvas.className = 'w-full border shadow';
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              const context = canvas.getContext('2d');
              await page.render({ canvasContext: context, viewport }).promise;

              wrapper.appendChild(canvas);
            }
          } catch (err) {
            console.error('PDF Render Error:', err);
          }
        }
      }
    };

    renderPdfs();
  }, [employee]);

  // ================= WAIT FOR IMAGES =================
  const waitForImages = async () => {
    const images = document.querySelectorAll('#printable-content img');
    const promises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    await Promise.all(promises);
  };

  // ================= DOWNLOAD PDF =================
  const handleGeneratePDF = async () => {
    try {
      const element = document.getElementById('printable-content');

      await waitForImages();
      await new Promise((resolve) => setTimeout(resolve, 800));

      const opt = {
        margin: 0,
        filename: `${employee.fullName}_profile.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      toast.error('Failed to generate PDF');
    }
  };

  // ================= SEND MAIL =================
  const handleMailToUniversity = async () => {
    if (!universityEmail) {
      toast.warn('Please enter university email');
      return;
    }

    const confirmed = window.confirm(
      `Send application to ${universityEmail}?`
    );
    if (!confirmed) return;

    try {
      const element = document.getElementById('printable-content');

      await waitForImages();
      await new Promise((resolve) => setTimeout(resolve, 800));

      const worker = html2pdf()
        .set({
          margin: 0,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(element);

      const blob = await worker.outputPdf('blob');

      const formData = new FormData();
      formData.append('pdf', blob, `${employee.fullName}_profile.pdf`);
      formData.append('studentName', employee.fullName);
      formData.append('regNumber', employee.regNumber);
      formData.append('email', employee.email);
      formData.append('universityEmail', universityEmail);

      await axios.post(
        'https://servocci-backend-dip7.onrender.com/api/employee/send-mail',
        formData
      );

      toast.success('📧 Email sent successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send email');
    }
  };

  if (!employee) return <div className="p-6">Loading...</div>;

  const docLabels = {
    profilePhoto: 'Profile Photo',
    aadharCard: 'Aadhar Card',
    panCard: 'PAN Card',
    tenthMarksheet: '10th Marksheet',
    twelfthMarksheet: '12th Marksheet',
    competitiveMarksheet: 'Competitive Exam Marksheet',
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <ToastContainer position="top-right" />

      {/* ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <div className="flex gap-2">
          <button onClick={handleGeneratePDF} className="bg-[#2c6975] text-white px-4 py-2 rounded hover:bg-[#001b48] transition">
            📄 Download PDF
          </button>
          <button onClick={handleMailToUniversity} className="bg-[#430000] text-white px-4 py-2 rounded hover:bg-[#2c6975] transition">
            📧 Mail to University
          </button>
        </div>

        <input
          type="email"
          placeholder="Enter university email"
          value={universityEmail}
          onChange={(e) => setUniversityEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-80"
        />
      </div>

      {/* EDIT BUTTON */}
      <div className="flex justify-end mb-4">
        <Link to={`/admin-dashboard/employee/${id}/edit`}>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
            ✏️ Edit Details
          </button>
        </Link>
      </div>

      {/* PRINTABLE CONTENT */}
      <div id="printable-content">
        <div className="bg-white p-6 rounded shadow mb-10">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="Servocci Logo" className="h-16 max-w-[120px]" />
            <h1 className="text-3xl font-bold text-[#001b48]">Servocci Counsellors</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-[#2c6975]">Student Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Registration No:</strong> {employee.regNumber || 'N/A'}</p>
            <p><strong>Full Name:</strong> {employee.fullName}</p>
            <p><strong>Father's Name:</strong> {employee.fatherName || 'N/A'}</p>
            <p><strong>Mobile:</strong> {employee.phoneMobile}</p>
            <p><strong>Parent Mobile:</strong> {employee.parentMobile || 'N/A'}</p>
            <p><strong>Email:</strong> {employee.email || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {employee.dob?.slice(0, 10) || 'N/A'}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Nationality:</strong> {employee.nationality}</p>
            <p><strong>Permanent Address:</strong> {employee.permanentAddress}</p>
            <p><strong>Aadhaar No:</strong> {employee.aadhaarNumber}</p>
            <p><strong>10th School:</strong> {employee.tenthSchool}</p>
            <p><strong>10th Board:</strong> {employee.tenthBoard}</p>
            <p><strong>10th Year:</strong> {employee.tenthYear}</p>
            <p><strong>10th %:</strong> {employee.tenthPercentage}</p>
            <p><strong>12th School:</strong> {employee.twelfthSchool}</p>
            <p><strong>12th Board:</strong> {employee.twelfthBoard}</p>
            <p><strong>12th Year:</strong> {employee.twelfthYear}</p>
            <p><strong>12th %:</strong> {employee.twelfthPercentage}</p>
            <p><strong>Subjects Taken:</strong> {employee.subjectsTaken}</p>
            <p><strong>Institution:</strong> {employee.department?.name || 'N/A'}</p>
            <p><strong>Course:</strong> {employee.intendedMajor}</p>
            <p><strong>Minor:</strong> {employee.minor}</p>
            <p><strong>Preferred Term:</strong> {employee.preferredTerm}</p>
            <p><strong>Scholarship:</strong> {employee.scholarship ? 'Yes' : 'No'}</p>
            <p><strong>Emergency Contact:</strong> {employee.emergencyContactName}</p>
            <p><strong>Emergency Phone:</strong> {employee.emergencyPhone}</p>
            <p><strong>Emergency Email:</strong> {employee.emergencyEmail}</p>
            <p><strong>Communication Consent:</strong> {employee.communicationConsent ? 'Yes' : 'No'}</p>
            <p className="col-span-full"><strong>Remarks:</strong> {employee.remarks || '—'}</p>
          </div>
        </div>

        {/* DOCUMENTS */}
        {Object.entries(docLabels).map(([key, label]) => {
          const url = employee.documents?.[key];
          return url ? (
            <div key={key} className="mb-10 bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#ff4f00]">{label}</h3>

              {url.endsWith('.pdf') ? (
                <div id={`pdf-wrapper-${key}`} />
              ) : (
                <img
                  src={url}
                  alt={label}
                  crossOrigin="anonymous"
                  className="max-w-full max-h-[1000px] border rounded shadow"
                />
              )}

              <div className="mt-4 flex gap-4">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Original
                </a>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default View;