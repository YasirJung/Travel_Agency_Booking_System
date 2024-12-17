import React from 'react';
import jsPDF from 'jspdf';

export default function Invoice({ booking, pkg }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Travel Agency Invoice', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Customer Name: ${booking.name}`, 20, 40);
    doc.text(`Email: ${booking.email}`, 20, 50);
    doc.text(`Phone Number: ${booking.phoneNumber}`, 20, 60);
    doc.text(`Number of Travelers: ${booking.numberOfTravelers}`, 20, 70);
    doc.text(`Package: ${pkg.title}`, 20, 80);
    doc.text(`Total Price: INR ${booking.totalPrice}`, 20, 90);

    doc.text(
      'Thank you for choosing our services!',
      105,
      120,
      null,
      null,
      'center'
    );
    doc.save('invoice.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Download Invoice
    </button>
  );
}
