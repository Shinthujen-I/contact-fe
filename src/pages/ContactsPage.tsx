import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { Contact } from '../types/contact';
import { getContacts, createContact, updateContact, deleteContact } from '../services/contactService';
import ContactForm from '../components/ContactForm';
import ContactTable from '../components/ContactTable';

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentContact, setCurrentContact] = useState<Contact | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await getContacts();
            setContacts(response.data);
        } catch (error) {
            message.error('Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setCurrentContact(null);
        setIsModalVisible(true);
    };

    const handleEdit = (contact: Contact) => {
        setCurrentContact(contact);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteContact(id);
            message.success('Contact deleted successfully');
            fetchContacts();
        } catch (error) {
            message.error('Failed to delete contact');
        }
    };

    const handleCreateContact = async (values: Omit<Contact, 'id'>) => {
        try {
            await createContact(values);
            message.success('Contact created successfully');
            setIsModalVisible(false);
            fetchContacts();
        } catch (error) {
            message.error('Failed to create contact');
        }
    };

    const handleUpdateContact = async (id: number, values: Partial<Omit<Contact, 'id'>>) => {
        try {
            await updateContact(id, values);
            message.success('Contact updated successfully');
            setIsModalVisible(false);
            fetchContacts();
        } catch (error) {
            message.error('Failed to update contact');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ padding: 20 }}>
            <Button type="primary" onClick={handleCreate} style={{ marginBottom: 20 }}>Add Contact</Button>
            <ContactTable contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
            <ContactForm
                visible={isModalVisible}
                onCreate={handleCreateContact}
                onUpdate={handleUpdateContact}
                onCancel={handleCancel}
                contact={currentContact}
            />
        </div>
    );
};

export default ContactsPage;
