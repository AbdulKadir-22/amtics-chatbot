import React from 'react';
import { Upload } from 'lucide-react';
import Button from '../common/Button';

const UploadPanel = ({ onUpload }) => {
    const fileInputRef = React.useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center text-center space-y-6 hover:border-blue-400 transition-colors group cursor-pointer shadow-sm"
        >
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.csv"
            />
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Upload size={32} />
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">Drop & Index Documents</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Drag academic PDFs, DOCX, or text files here to upload. Supports bulk ingestion for AI training.
                </p>
            </div>
            <Button variant="outline">
                Browse Files
            </Button>
        </div>
    );
};

export default UploadPanel;
