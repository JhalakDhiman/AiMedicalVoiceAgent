'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import moment from 'moment'

const HistoryDialog = ({ record }) => {

    console.log("record in dialog is : ", record);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'link'} size={'sm'}>
                        View Report
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle asChild>
                            <h1 className='text-blue-700 text-center text-2xl font-bold'>
                                AI Medical Voice Agent Report
                            </h1>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div className="mt-4 space-y-4 text-sm">
                                {/* Session Info */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Session Info
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <p><span className="font-semibold">Doctor:</span> {record?.selectedDoctor?.specialist}</p>
                                        <p><span className="font-semibold">User:</span> {record?.report?.user || "Anonymous"}</p>
                                        <p><span className="font-semibold">Consulted On:</span> {moment(record?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
                                        <p><span className="font-semibold">Agent:</span> {record?.selectedDoctor?.specialist} AI</p>
                                    </div>
                                </div>

                                {/* Chief Complaint */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Chief Complaint
                                    </h2>
                                    <p className="pt-2">{record?.report?.chiefComplaint || "N/A"}</p>
                                </div>

                                {/* Summary */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Summary
                                    </h2>
                                    <p className="pt-2">{record?.report?.summary || "No summary available."}</p>
                                </div>

                                {/* Symptoms */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Symptoms
                                    </h2>
                                    <ul className="list-disc list-inside pt-2">
                                        {record?.report?.symptoms?.length > 0 ? (
                                            record.report.symptoms.map((sym, idx) => (
                                                <li key={idx}>{sym}</li>
                                            ))
                                        ) : (
                                            <li>Not specified</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Duration & Severity */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Duration & Severity
                                    </h2>
                                    <div className="flex gap-44 pt-2">
                                        <p><span className="font-semibold">Duration:</span> {record?.report?.duration || "Not specified"}</p>
                                        <p><span className="font-semibold">Severity:</span> {record?.report?.severity || "Not specified"}</p>
                                    </div>
                                </div>

                                {/* Medications Mentioned */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Medications Mentioned
                                    </h2>
                                    <ul className="list-disc list-inside pt-2">
                                        {record?.report?.medicationsMentioned?.length > 0 ? (
                                            record.report.medicationsMentioned.map((med, idx) => (
                                                <li key={idx}>{med}</li>
                                            ))
                                        ) : (
                                            <li>No medications mentioned</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Recommendations */}
                                <div>
                                    <h2 className="text-blue-700 border-b border-blue-700 pb-1 font-semibold">
                                        Recommendations
                                    </h2>
                                    <ul className="list-disc list-inside pt-2">
                                        {record?.report?.recommendations?.length > 0 ? (
                                            record.report.recommendations.map((rec, idx) => (
                                                <li key={idx}>{rec}</li>
                                            ))
                                        ) : (
                                            <li>No recommendations provided</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Footer Note */}
                                <p className="text-xs text-gray-500 pt-4 border-t text-center">
                                    This report was generated by an AI Medical Assistant for informational purposes only.
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default HistoryDialog
