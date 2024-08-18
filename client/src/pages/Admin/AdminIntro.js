import React from 'react';
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminIntro() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/update-intro", {
                ...values,
                _id: portfolioData.intro._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <div>
            <Form
                onFinish={onFinish}
                layout='vertical'
                initialValues={portfolioData.intro}
            >
                <Form.Item name='welcomeText' label='Welcome Text'>
                    <Input placeholder='Welcome Text' />
                </Form.Item>
                <Form.Item name='firstName' label='First Name'>
                    <Input placeholder='First Name' />
                </Form.Item>
                <Form.Item name='lastName' label='Last Name'>
                    <Input placeholder='Last Name' />
                </Form.Item>
                <Form.Item name='caption' label='Caption'>
                    <Input placeholder='Caption' />
                </Form.Item>
                <Form.Item name='description' label='Description'>
                    <Input.TextArea placeholder='Description' />
                </Form.Item>
                <Form.Item name='resume' label='Resume'>
                    <Input placeholder='Resume link' />
                </Form.Item>
                <div className='flex justify-end w-full'>
                    <button className='px-10 py-2 bg-secondary text-white' type='submit'>
                        Save
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default AdminIntro;
