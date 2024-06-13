import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Contact } from '../types/contact';

interface ContactFormProps {
    visible: boolean;
    onCreate: (values: Omit<Contact, 'id'>) => void;
    onUpdate: (id: number, values: Partial<Omit<Contact, 'id'>>) => void;
    onCancel: () => void;
    contact: Contact | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ visible, onCreate, onUpdate, onCancel, contact }) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (contact) {
            form.setFieldsValue(contact);
        } else {
            form.resetFields();
        }
    }, [contact, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                if (contact) {
                    onUpdate(contact.id, values);
                } else {
                    onCreate(values);
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={contact ? 'Edit Contact' : 'Add Contact'}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ContactForm;
