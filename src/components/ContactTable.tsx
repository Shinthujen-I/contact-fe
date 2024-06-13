import React from 'react';
import { Table, Button } from 'antd';
import { Contact } from '../types/contact';

interface ContactTableProps {
    contacts: Contact[];
    onEdit: (contact: Contact) => void;
    onDelete: (id: number) => void;
    loading: boolean;
}

const ContactTable: React.FC<ContactTableProps> = ({ contacts, onEdit, onDelete, loading }) => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_text: string, record: Contact) => (
                <span>
                    <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
                    <Button type="link" onClick={() => onDelete(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={contacts} rowKey="id" loading={loading} />
    );
};

export default ContactTable;
