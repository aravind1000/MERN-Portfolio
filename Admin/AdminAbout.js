import React from 'react';
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../client/src/redux/rootSlice';
import axios from 'axios';

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
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
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout='vertical'
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(", "),
        }}
      >
        <Form.Item name='image' label='Image URL'>
          <Input placeholder='Image URL' />
        </Form.Item>
        <Form.Item name='description1' label='Description1'>
          <Input.TextArea placeholder='Description1' />
        </Form.Item>
        <Form.Item name='description2' label='Description2'>
          <Input.TextArea placeholder='Description2' />
        </Form.Item>
        <Form.Item name='skills' label='Skills'>
          <Input.TextArea placeholder='Skills (comma separated)' />
        </Form.Item>
        <div className='flex justify-end w-full'>
          <button className='px-10 py-2 bg-secondary text-white' type='submit'>
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;