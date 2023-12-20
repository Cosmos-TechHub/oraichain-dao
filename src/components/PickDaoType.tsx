import React, { useState } from "react";
import { Button, Form, Input, message, Radio, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

type FieldType = {
  daoName?: string;
  description?: string;
  daoType?: string;
};

const PickDaoType = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = () => {};
  const onReset = () => {};

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined className="text-lg" />}
    </div>
  );

  return (
    <div id="pick-dao-type">
      <div className="mt-14 mb-12 flex flex-col items-center justify-center gap-4">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              className="w-[132px] h-[132px] rounded-full hover:border-[#1677ff]"
            />
          ) : (
            uploadButton
          )}
        </Upload>

        <div className="text-custom-grey text-lg font-semibold">
          Add an image
        </div>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        onReset={onReset}
      >
        <div className="bg-custom-grey-card px-6 pt-6 pb-2">
          <Form.Item<FieldType>
            label="Name"
            name="daoName"
            rules={[{ required: true }]}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Input placeholder="Give your DAO a name" />
          </Form.Item>

          <div id="hline"></div>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Give your DAO a description..."
              style={{ height: 118 }}
            />
          </Form.Item>
        </div>

        <div className="px-6 mt-8">
          <Form.Item<FieldType>
            label="Choose a structure"
            name="daoType"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Radio.Group className="mt-4 flex justify-between">
              <Radio value="apple"> 
                <div className="min-h-[300px] w-full bg-red-300">
                  hi
                </div>
               </Radio>
              <Radio value="pear"> Pear </Radio>
              <Radio value="pear"> Pear </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PickDaoType;
