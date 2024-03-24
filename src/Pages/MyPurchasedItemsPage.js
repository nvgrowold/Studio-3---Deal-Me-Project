import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportsPage() {
    const [reports, setReports] = useState([]); // State to store the fetched reports
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsRef = collection(db, 'reports'); // Change 'reports' to your collection name
                const q = query(reportsRef, where('someCondition', '==', 'someValue')); // Adjust conditions as needed
                const querySnapshot = await getDocs(q);
                
                const fetchedReports = [];
                querySnapshot.forEach(doc => {
                    fetchedReports.push({ id: doc.id, ...doc.data() });
                });

                setReports(fetchedReports); // Update state with fetched reports
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setLoading(false);
            }
        };

        fetchReports();
    }, []); // Empty dependency array to fetch reports only once when component mounts

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-teal-100">
            <Header />
            <div className="max-w-6xl px-3 mt-10 mx-auto">
                <h2 className="text-center font-semibold mb-10 text-2xl sticky text-sky-800">
                    Reports
                </h2>
                {loading && <p>Loading...</p>}
                {!loading && reports.length === 0 && (
                    <div className="text-center mt-10 text-sky-800 bg-transparent">
                        <p>No reports found.</p>
                    </div>
                )}
                {!loading && reports.length > 0 && (
                    <div>
                        {/* Render reports data */}
                        {reports.map(report => (
                            <div key={report.id}>
                                {/* Render individual report details */}
                                <p>Report ID: {report.id}</p>
                                <p>Report Data: {JSON.stringify(report)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
