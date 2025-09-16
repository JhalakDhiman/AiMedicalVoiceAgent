import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import HistoryDialog from './HistoryDialog'

const HistoryTable = ({ historyList }) => {
    return (
        <div>
            <Table>
                <TableCaption>Previous Consultation Reports : </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ai Medical Specialist </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        historyList?.map((record,index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{record?.selectedDoctor?.specialist}</TableCell>
                                <TableCell>{record?.report?.symptoms[0]}</TableCell>
                                <TableCell>{moment(new Date(record?.createdAt)).fromNow()}</TableCell>
                                <TableCell className="text-right">
                                    <HistoryDialog record={record}/>
                                </TableCell>
                            </TableRow>
                        ))

                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryTable
