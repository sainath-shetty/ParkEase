import { useState } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';

// Extract Indian number plate from noisy OCR output
const normalizePlate = (raw) => {
    const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // 1. Standard state plate: MH12AB1234 (most common)
    //    2 letters + 2 digits + 1-3 letters + 4 digits
    const standard = cleaned.match(/[A-Z]{2}\d{2}[A-Z]{1,3}\d{4}/);
    if (standard) return standard[0];

    // 2. BH (Bharat) series: 22BH0001AA
    //    2 digits + BH + 4 digits + 2 letters
    const bh = cleaned.match(/\d{2}BH\d{4}[A-Z]{2}/);
    if (bh) return bh[0];

    // 3. Older plates with single-digit district code: DL1CAB1234
    //    2 letters + 1 digit + 1-3 letters + 4 digits
    const older = cleaned.match(/[A-Z]{2}\d[A-Z]{1,3}\d{4}/);
    if (older) return older[0];

    // Fallback: return full cleaned string
    return cleaned;
};

const useParkingBill = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [entryTime, setEntryTime] = useState('');
    const [exitTime, setExitTime] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState('');
    const [charge, setCharge] = useState('');
    const [numplate, setNumPlate] = useState('');
    // 'idle' | 'entry_registered' | 'bill_ready' | 'error'
    const [scanStatus, setScanStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setImagePreview(url);
        }
    };

    const sendRequest = async (recognizedText) => {
        const plate = normalizePlate(recognizedText);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/vehicle/enter`, {
                numPlate: plate,
                enterTime: new Date().toString(),
            });
            if (response.data.timeEntered) {
                // Exit scan — vehicle was parked, generate the bill
                setNumPlate(response.data.numPlate);
                const date1 = new Date();
                setExitTime(date1.toString());
                const date2 = new Date(response.data.timeEntered);
                setEntryTime(response.data.timeEntered);
                const durationInMinutes = (date1 - date2) / (1000 * 60);
                setCharge(durationInMinutes > 60 ? (20 * durationInMinutes / 60) : 10);
                setDuration(durationInMinutes.toFixed(2));
                setScanStatus('bill_ready');
            } else {
                // Entry scan — vehicle registered for the first time or re-entry
                setNumPlate(plate);
                setScanStatus('entry_registered');
            }
        } catch (err) {
            console.error('Failed to register vehicle entry:', err);
            setScanStatus('error');
            setErrorMessage(
                'Could not reach the server. Make sure the backend is running and REACT_APP_API_URL is set correctly.'
            );
        }
    };

    const handleScan = () => {
        if (!image) return;
        setIsLoading(true);
        Tesseract.recognize(image, 'eng', {
            logger: (m) => {
                if (m.status === 'recognizing text') {
                    setProgress(parseInt(m.progress * 100));
                }
            },
        }).then(({ data: { text } }) => {
            setText(text);
            setIsLoading(false);
            sendRequest(text);
        });
    };

    const handleReset = () => {
        setText(''); setEntryTime(''); setExitTime('');
        setImage(''); setImagePreview(''); setProgress(0);
        setDuration(''); setCharge(''); setNumPlate('');
        setScanStatus('idle'); setErrorMessage('');
    };

    return {
        isLoading,
        text,
        entryTime,
        exitTime,
        image,
        imagePreview,
        progress,
        duration,
        charge,
        numplate,
        scanStatus,
        errorMessage,
        handleFileChange,
        handleScan,
        handleReset,
    };
};

export default useParkingBill;
