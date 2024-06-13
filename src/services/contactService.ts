import axios from 'axios';
import { Contact } from '../types/contact';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getContacts = () => axios.get<Contact[]>(`${API_URL}/contacts`);

export const getContactById = (id: number) => axios.get<Contact>(`${API_URL}/contacts/${id}`);

export const createContact = (data: Omit<Contact, 'id'>) => axios.post<Contact>(`${API_URL}/contacts`, data);

export const updateContact = (id: number, data: Partial<Omit<Contact, 'id'>>) => axios.put<Contact>(`${API_URL}/contacts/${id}`, data);

export const deleteContact = (id: number) => axios.delete(`${API_URL}/contacts/${id}`);
