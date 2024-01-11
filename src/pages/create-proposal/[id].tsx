import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useChain } from "@cosmos-kit/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { network } from "@/config";
import { DaoProposalSingleClient } from "@/codegen/DaoProposalSingle.client";

const CreateProposal = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { status, getSigningCosmWasmClient, address } = useChain(
    network.chainName
  );

  const [proposalClient, setProposalClient] =
    useState<DaoProposalSingleClient | null>(null);
  const [daoAddr, setDaoAddr] = useState<string>("");
  const [loadingMakeProposal, setLoadingMakeProposal] = useState(false);

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    if (address && proposalClient) {
      setLoadingMakeProposal(true);
      try {
        const res = await proposalClient.propose({
          title: values.proposalName,
          description: values.description,
          msgs: [],
        });

        setLoadingMakeProposal(false);
        form.resetFields();
        toast.success("Make proposal success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push({ pathname: "/dao/[id]", query: { id: daoAddr } });
      } catch (err: any) {
        console.log(err);
        const message = err.message
        setLoadingMakeProposal(false);

        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  type FieldType = {
    proposalName?: string;
    description?: string;
  };

  useEffect(() => {
    const getProposalClient = async () => {
      if (router.isReady && status === "Connected" && address) {
        const proposalAddr = router.query.id;

        if (typeof proposalAddr === "string") {
          const client = await getSigningCosmWasmClient();
          const newProposalClient = new DaoProposalSingleClient(
            client,
            address,
            proposalAddr
          );
          const daoAddr = await newProposalClient.dao();

          setDaoAddr(daoAddr);
          setProposalClient(newProposalClient);
        }
      } else {
        setProposalClient(null);
      }
    };

    getProposalClient();
  }, [router, status, address]);

  return (
    <div id="create-proposal">
      <h1 className="text-lg text-secondary-grey font-semibold">
        New proposal
      </h1>

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
        <Form.Item<FieldType>
          label="Proposal's name"
          name="proposalName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Give your proposal a name" />
        </Form.Item>

        <div id="hline"></div>

        <Form.Item<FieldType>
          label="Description – Supports Markdown format"
          name="description"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            placeholder="Give your proposal a description..."
            style={{ height: 118 }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
          <Button htmlType="reset" className="mr-6">
            Reset
          </Button>
          <Button
          id="primary"
            htmlType="submit"
            disabled={status !== "Connected" ? true : false}
            loading={loadingMakeProposal}
            className="bg-secondary-grey text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProposal;
