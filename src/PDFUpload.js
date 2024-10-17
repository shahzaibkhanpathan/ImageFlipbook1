import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import { db } from './firebase'; 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Set the worker source for PDF.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const PDFUpload = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPdfFile(file);
            convertPdfToImages(file);
        }
    };

    const convertPdfToImages = async (pdfFile) => {
        const imgUrls = [];
        const pdf = await getDocument(URL.createObjectURL(pdfFile)).promise;
        const totalPages = pdf.numPages;

        for (let i = 1; i <= totalPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            imgUrls.push(canvas.toDataURL());
        }

        setImages(imgUrls);
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <div>
                {images.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt={`Page ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default PDFUpload;
