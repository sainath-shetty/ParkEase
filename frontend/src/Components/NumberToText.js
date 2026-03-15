import React from 'react';
import useParkingBill from '../hooks/useParkingBill';
import Header from './Header';
import UploadCard from './UploadCard';
import LoadingCard from './LoadingCard';
import ParkingTicket from './ParkingTicket';
import Footer from './Footer';

const NumberToText = () => {
    const {
        isLoading,
        text,
        entryTime,
        exitTime,
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
    } = useParkingBill();

    return (
        <div className="abs-page">
            <Header />

            <main className="abs-main">
                {!isLoading && !text && (
                    <UploadCard
                        imagePreview={imagePreview}
                        onFileChange={handleFileChange}
                        onScan={handleScan}
                        hasImage={!!imagePreview}
                    />
                )}

                {isLoading && <LoadingCard progress={progress} />}

                {!isLoading && text && (
                    <div className="abs-card bill-card">
                        <ParkingTicket
                            numplate={numplate}
                            entryTime={entryTime}
                            exitTime={exitTime}
                            duration={duration}
                            charge={charge}
                            scanStatus={scanStatus}
                            errorMessage={errorMessage}
                            onReset={handleReset}
                        />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default NumberToText;
